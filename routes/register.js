const express = require("express");

const controller = require("../controllers/usersController");
const router = express.Router();

router.post("/register", controller.registerPost);

module.exports = router;