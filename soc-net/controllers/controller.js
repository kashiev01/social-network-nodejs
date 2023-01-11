const { Subscription, Post, User } = require("../models/model");
const { Op } = require("sequelize");

exports.getProfile = (req, res, next) => {
	const email = req.query.email;
	console.log(email);
	User.findAll().then(user => {
		if (user == false) {
			User.create({
				firstName: "John",
				lastName: "Doe",
				email: "john.doe@gmail.com",
			})
				.then(result => {
					res.send("User John Doe was created");
				})
				.catch(err => {
					console.log(err);
				});
		} else if (user) {
			User.findByPk(1).then(result => {
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
		message: message,
	}).then(result => {
		Post.hasOne(User, {
			foreignKey: "userId",
		});
		res.send(`A new message was posted: "${message}"`);
	});
};

exports.getPost = (req, res, next) => {
	const dateTime = req.query.dateTime;
	if (dateTime) {
		Post.findAll({
			where: {
				createdAt: {
					[Op.gt]: dateTime,
					[Op.lt]: new Date(),
				},
			},
		})
			.then(result => {
				res.send(result);
			})
			.catch(err => {
				console.log(err);
			});
	} else {
		Post.findAll({
			limit: 20,
			order: [["createdAt", "DESC"]],
			where: {
				userId: 3,
			},
		})
			.then(posts => {
				res.send(posts);
			})
			.catch(err => {
				console.log(err);
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
				email,
				followerId: result.id,
			})
				.then(result => {
					User.hasMany(Subscription, {
						foreignKey: "followerId",
					});

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
	Subscription.findAll()
		.then(result => {
			res.send(result[0]);
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
