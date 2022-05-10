const express = require('express');
const router = express.Router();
const controller = require("./controller");
const v = require('./middleware/validation');
const authToken = require('./middleware/chekToken');

router.post("/reg",v , controller.registration);
router.post("/login", v, controller.login);
router.get("/user", authToken, controller.getUser);

module.exports = router;