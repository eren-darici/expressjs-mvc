const express = require("express");

const controller = require("../controllers/usersController");
const router = express.Router();

router.post("/login", controller.loginPost);

module.exports = router;