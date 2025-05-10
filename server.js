const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const app = express();

app.get("/", (req, res) => {
    console.log(arguments)
	res.send("Hello World");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
