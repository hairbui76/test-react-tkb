const express = require("express");
const router = express.Router();

const Data1 = require("../models/Data1");
const Data2 = require("../models/Data2");

router.get("/group1", (req, res) => {
	if (req.query.type == "fetch") {
		Data1.find({}).then((data) => {
			res.json(data);
		});
	} else res.redirect("/");
});

router.get("/group2", (req, res) => {
	if (req.query.type == "fetch") {
		Data2.find({}).then((data) => {
			res.json(data);
		});
	} else res.redirect("/");
});

router.get("/:slug", (req, res) => {
	res.redirect("/");
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
