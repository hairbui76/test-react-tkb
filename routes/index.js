const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Data1 = require("../models/Data1");
const Data2 = require("../models/Data2");

mongoose
	.connect(
		process.env.MONGODB_URI ||
			"mongodb+srv://yasuo:buihaidz2k3@new.hborl.mongodb.net/react_test?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log("connect successfully"))
	.catch((err) => console.log(err));

router.get("/group1", (req, res) => {
	Data1.find({}).then((data) => {
		res.json(data);
	});
});

router.get("/group2", (req, res) => {
	Data2.find({}).then((data) => {
		res.json(data);
	});
});

router.post("/group1", (req, res) => {
	Data1.deleteMany({}).catch((err) => console.log(err));
	req.body.forEach((data) => {
		let newData = new Data1(data);
		newData.save();
	});
});

router.post("/group2", (req, res) => {
	Data2.deleteMany({}).catch((err) => console.log(err));
	req.body.forEach((data) => {
		let newData = new Data2(data);
		newData.save();
	});
});

module.exports = router;
