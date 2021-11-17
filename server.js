const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");

const app = express();
const port = process.env.PORT || 8080;

mongoose
	.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("connect successfully"))
	.catch((err) => console.log(err));

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.all("*", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});
app.use("/", router);

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}
