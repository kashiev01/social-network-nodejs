const express = require("express");
const routes = require("./routes/routes");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/blog", routes);

sequelize
	.sync()
	.then(result => {
		console.log(
			"---------------------Tables are created------------------------"
		);
	})
	.catch(err => {
		console.log(err);
	});

app.listen(8000);
