const { Subscription, Post, User } = require("../models/model");
const { Op } = require("sequelize");

exports.getProfile = (req, res, next) => {
	const email = req.params.email;
	User.findOne({
		where: {
			email: email,
		},
	}).then(user => {
		console.log(user);
		if (!user) {
			User.create({
				firstName: "John",
				lastName: "Doe",
				email: email,
			})
				.then(result => {
					res.send(`John Doe with email ${email} was created`);
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			User.findOne({
				where: {
					email: email,
				},
			}).then(result => {
				res.send(result);
			});
		}
	});
};

exports.editProfile = (req, res, next) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;

	User.update(
		{
			firstName,
			lastName,
		},
		{
			where: { id: 1 },
		}
	)
		.then(result => {
			res.send(
				`First name and last name were changed to ${firstName} ${lastName}`
			);
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postPost = (req, res, next) => {
	const message = req.body.message;
	console.log(message);
	Post.create({
		message,
		userId: 1,
	}).then(result => {
		res.send(`A new message was posted: "${message}"`);
	});
};

exports.getPost = (req, res, next) => {
	const dateTime = req.query.dateTime;
	if (dateTime) {
		Subscription.findAll({
			where: {
				followerId: 1,
			},
		}).then(result => {
			const ids = result.map(obj => {
				return obj.followeeId;
			});
			Post.findAll({
				where: {
					createdAt: {
						[Op.gt]: dateTime,
						[Op.lt]: new Date(),
					},
					userId: [...ids, 1],
				},
			})
				.then(result => {
					res.send(result);
				})
				.catch(err => {
					console.log(err);
				});
		});
	} else {
		Subscription.findAll({
			where: {
				followerId: 1,
			},
		}).then(result => {
			const ids = result.map(obj => {
				return obj.followeeId;
			});
			Post.findAll({
				where: {
					userId: [...ids, 1],
				},
				limit: 20,
				order: [["createdAt", "DESC"]],
			})
				.then(posts => {
					res.send(posts);
				})
				.catch(err => {
					console.log(err);
				});
		});
	}
};

exports.postSubscribe = (req, res, next) => {
	const email = req.body.email;
	User.findOne({
		where: {
			email: email,
		},
	})
		.then(result => {
			Subscription.create({
				followerId: 1,
				followeeId: result.id,
			})
				.then(result => {
					// Subscription.hasMany(Subscription, {
					// 	foreignKey: "followeeId",
					// });
					res.send(`Subscribed to user ${email}`);
				})
				.catch(err => {
					console.log(err);
				});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getSubscribtions = (req, res, next) => {
	Subscription.findAll({
		raw: true,
		where: {
			followerId: 1,
		},
	})
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			console.log(err);
		});
};

exports.deleteSubscriptions = (req, res, next) => {
	Subscription.destroy({
		where: {},
		truncate: true,
	})
		.then(result => {
			res.send("Subscriptions are deleted");
		})
		.catch(err => {
			console.log(err);
		});
};

exports.addTestUser = (req, res, next) => {
	const email = req.body.email;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;

	User.create({
		email,
		firstName,
		lastName,
	})
		.then(result => {
			res.send(`User ${firstName} ${lastName} was created`);
		})
		.catch(err => {
			console.log(err);
		});
};
