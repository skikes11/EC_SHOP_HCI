const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { loginCheck, authorize } = require("../middleware/auth");

router.post("/signup", authController.postSignup);
router.post("/signin", authController.postSignin);
router.post("/user", loginCheck, authorize('admin'), authController.allUser);

module.exports = router;
