const { Router } = require("express");
const router = Router();
const auth = require("../Middlewares/auth");
const restrictTo = require('../Middlewares/restrictTo')

const usersController = require("../Controllers/usersController");

router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

router.get("/", auth, restrictTo("admin"), usersController.getAllUsers);

module.exports = router;
