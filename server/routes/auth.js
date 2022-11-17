const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { loginCheck, adminAuthenticate } = require("../middleware/auth");

router.post("/signup", authController.postSignup);
router.post("/signin", authController.postSignin);
router.post("/user", loginCheck, adminAuthenticate, authController.allUser);

module.exports = router;
