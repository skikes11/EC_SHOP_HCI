const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categories");
const multer = require("multer");
const { loginCheck, adminAuthenticate } = require("../middleware/auth");

// Image Upload setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/categories");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/all-category", categoryController.getAllCategory);

//ADMIN PERMISSIONS
router.post(
  "/add-category",
  loginCheck,
  adminAuthenticate,
  upload.single("cImage"),
  categoryController.postAddCategory
);
router.post(
  "/edit-category",
  loginCheck,
  adminAuthenticate,
  categoryController.postEditCategory
);
router.post(
  "/delete-category",
  loginCheck,
  adminAuthenticate,
  categoryController.getDeleteCategory
);

module.exports = router;
