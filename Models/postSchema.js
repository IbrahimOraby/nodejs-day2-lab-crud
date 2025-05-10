const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	price: {
		type: Number,
		required: true
	}
});

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
