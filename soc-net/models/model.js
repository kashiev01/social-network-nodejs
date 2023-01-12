const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("user", {
	firstName: {
		type: DataTypes.STRING,
		require: true,
	},
	lastName: {
		type: DataTypes.STRING,
		require: true,
	},
	email: {
		type: DataTypes.STRING,
		require: true,
	},
});

const Post = sequelize.define("post", {
	message: {
		type: DataTypes.TEXT,
		require: true,
	},

	userId: {
		type: DataTypes.INTEGER,
		references: {
			model: User,
			key: "id",
		},
	},
});

const Subscription = sequelize.define("subscription", {
	followerId: {
		type: DataTypes.INTEGER,
		require: true,
		references: {
			model: User,
			key: "id",
		},
	},

	followeeId: {
		type: DataTypes.INTEGER,
		require: true,
		references: {
			model: User,
			key: "id",
		},
	},
});

module.exports = { Subscription, User, Post };
