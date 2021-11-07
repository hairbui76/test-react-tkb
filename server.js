import express, { json, urlencoded } from "express";
import router from "./routes";

const app = express();
const port = process.env.PORT || 8080;

app.use(json());
app.use(
	urlencoded({
		extended: true,
	})
);

app.use("/", router);

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}
