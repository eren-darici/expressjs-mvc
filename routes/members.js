const express = require("express");
const controller = require("../controllers/membersController");

const auth = require("../middleware/auth");

require("dotenv").config();

const router = express.Router();

router.get("/", auth, controller.get);
router.get("/:id", auth, controller.getWithID);
router.post("/", auth, controller.post);

module.exports = router;