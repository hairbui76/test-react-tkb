import { Router } from "express";
const router = Router();

import { connect } from "mongoose";
import Data1, { find, deleteMany } from "../models/Data1";
import Data2, {
	find as _find,
	deleteMany as _deleteMany,
} from "../models/Data2";

connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("connect successfully"))
	.catch((err) => console.log(err));

router.get("/group1", (req, res) => {
	find({}).then((data) => {
		res.json(data);
	});
});

router.get("/group2", (req, res) => {
	_find({}).then((data) => {
		res.json(data);
	});
});

router.post("/group1", (req, res) => {
	deleteMany({}).catch((err) => console.log(err));
	req.body.forEach((data) => {
		let newData = new Data1(data);
		newData.save();
	});
});

router.post("/group2", (req, res) => {
	_deleteMany({}).catch((err) => console.log(err));
	req.body.forEach((data) => {
		let newData = new Data2(data);
		newData.save();
	});
});

export default router;
