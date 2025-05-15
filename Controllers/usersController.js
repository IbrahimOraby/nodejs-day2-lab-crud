const User = require("../Models/usersSchema");
const bcrypt = require("bcrypt");
const util = require("util");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const jwtSign = util.promisify(jwt.sign);

const signup = async (req, res) => {
	const { email, name, password, role } = req.body;

	if (!email || !password || !name) {
		res.status(400).json({
			message: "Invalid Data",
			status: "failed"
		});
	}

	const saltRounds = +process.env.SALT_ROUNDS;

	const hashedPassword = await bcrypt.hash(password, saltRounds);

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
		role: role || "user"
	});

	const registeredUser = {
		...user.toObject(),
		password: undefined,
		__v: undefined
	};

	res.json({
		message: "user created successfully",
		status: "success",
		data: registeredUser
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({
			message: "Invalid Data",
			status: "failed"
		});
	}

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(401).json({
			message: "Invalid email or password",
			status: "failed"
		});
	}

	const isPasswordMatched = await bcrypt.compare(password, user.password);

	if (!isPasswordMatched) {
		return res.status(401).json({
			message: "Invalid email or password",
			status: "failed"
		});
	}

	const token = await jwtSign(
		{ _id: user._id, role: user.role },
		process.env.JWT_SECRET_KEY,
		{
			expiresIn: "1h"
		}
	);

	res.status(200).json({
		message: "user logged in successfully",
		status: "success",
		data: {
			accessToken: token
		}
	});
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json({
    message: "users fetched successfully",
    status: "success",
    data: users,
  });
};

module.exports = {
	signup,
	login,
    getAllUsers
};
