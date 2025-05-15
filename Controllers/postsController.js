const Post = require("../Models/postSchema");

//post
const createPost = async (req, res) => {
	const { title, description } = req.body;

	if (!title || !description) {
		return res.status(400).json({
			message: "Invalid Data",
			status: "failed"
		});
	}

	const post = await Post.create({
		title,
		description
	});

	res.json({
		message: "post created successfully",
		status: "success",
		data: post
	});
};

//get
const getAllPosts = async (req, res) => {
	const posts = await Post.find();
	res.json({
		message: "posts fetched successfully",
		status: "success",
		data: posts
	});
};

//get by id
const getPostById = async (req, res) => {
	const id = req.params.id;

	const post = await Post.findById(id);

	if (!post) {
		return res.status(401).json({
			message: "post not found",
			status: "failed"
		});
	}

	res.json({
		message: "post fetched successfully",
		status: "success",
		data: post
	});
};

//update
const updatePost = async (req, res) => {
	const id = req.params.id;

	const post = await Post.findByIdAndUpdate(
		id,
		{
			name: req.body.name
		},
		{
			new: true
		}
	);

	if (!post) {
		return res.status(404).json({
			message: "post not found",
			status: "failed"
		});
	}

	res.json({
		message: "post updated successfully",
		status: "success",
		data: post
	});
};

//delete
const deletePost = async (req, res) => {
	const id = req.params.id;

	const post = await Post.findByIdAndDelete(id);

	if (!post) {
		return res.status(404).json({
			message: "post not found",
			status: "failed"
		});
	}

	res.status(204).json({
		message: "post deleted successfully",
		status: "success"
	});
};

module.exports = {
	createPost,
	getAllPosts,
	getPostById,
	updatePost,
	deletePost
};
