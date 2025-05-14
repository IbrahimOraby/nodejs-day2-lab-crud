const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const postsRouter = require("./Routers/postsRoutes");

// const port = 3000;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/posts", postsRouter);

app.listen(3000, () => {
	console.log("server is running on port 3000");

	mongoose
		.connect("mongodb://localhost:27017/iti_dev2_task_nodejs")
		.then(() => {
			console.log("Connected to MongoDB successfully");
		})
		.catch((err) => {
			console.error("Error connecting to MongoDB:", err);
		});
});
