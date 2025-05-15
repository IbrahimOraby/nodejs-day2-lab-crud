const mongoose = require("mongoose");

//users schema

const usersSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user"
	}
});

//user model
const User = mongoose.model('user',usersSchema);

module.exports = User;
