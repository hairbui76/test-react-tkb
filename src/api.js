const express = require("express");
const router = require("./routes");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use("/.netlify/functions/api", router);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("./client/build"));
}

module.exports = app;
const handler = serverless(app);
module.exports.handler = async (event, context) => {
	await mongoose
		.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log("connect successfully"))
		.catch((err) => console.log(err));
	const result = await handler(event, context);
	return result;
};
