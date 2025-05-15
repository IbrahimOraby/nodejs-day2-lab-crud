const { Router } = require("express");
const router = Router();
const usersController = require("../Controllers/usersController");

router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

module.exports = router;
