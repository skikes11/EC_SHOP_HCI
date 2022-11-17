const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");
const { loginCheck, adminAuthenticate } = require("../middleware/auth");

router.post("/signle-user", usersController.getSingleUser);
router.post("/change-password", usersController.changePassword);
router.post("/forgot-password", usersController.forgotPassword);
router.post("/reset-password", usersController.resetPassword);

//ADMIN PERMISSIONS
router.get(
  "/all-user",
  loginCheck,
  adminAuthenticate,
  usersController.getAllUser
);
router.post(
  "/add-user",
  loginCheck,
  adminAuthenticate,
  usersController.postAddUser
);
router.post(
  "/edit-user",
  loginCheck,
  adminAuthenticate,
  usersController.postEditUser
);
router.post(
  "/delete-user",
  loginCheck,
  adminAuthenticate,
  usersController.getDeleteUser
);

module.exports = router;
