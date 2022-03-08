const express = require("express");
const controller = require("../controllers/eventsController");

const auth = require("../middleware/auth");

require("dotenv").config();

const router = express.Router();

router.get("/", controller.get);
router.get("/:id", controller.getWithID);
router.post("/", auth, controller.post);


module.exports = router;