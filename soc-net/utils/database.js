const Sequelize = require("sequelize");

const sequelize = new Sequelize("soc-net", "postgres", "postgrespw", {
	dialect: "postgres",
	host: "host.docker.internal",
	port: 49153,
});

module.exports = sequelize;
