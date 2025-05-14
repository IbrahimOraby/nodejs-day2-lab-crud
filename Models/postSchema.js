const mongoose = require("mongoose");

//schema
const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	}
});

//model
const Post = mongoose.model("posts", postSchema);

module.exports = Post;
