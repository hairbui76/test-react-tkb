import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const Data1 = new Schema({
	task: String,
	index: Number,
	background: String,
	color: String,
	updateAt: String,
});

export default model("Data1", Data1);
