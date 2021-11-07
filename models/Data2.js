import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const Data2 = new Schema({
	task: String,
	index: Number,
	background: String,
	color: String,
	updateAt: String,
});

export default model("Data2", Data2);
