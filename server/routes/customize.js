const express = require("express");
const router = express.Router();
const customizeController = require("../controller/customize");
const multer = require("multer");
const { loginCheck, adminAuthenticate } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/customize");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/get-slide-image", customizeController.getImages);

//ADMIN PERMISSIONS
router.post(
  "/delete-slide-image",
  loginCheck,
  adminAuthenticate,
  customizeController.deleteSlideImage
);
router.post(
  "/upload-slide-image",
  upload.single("image"),
  loginCheck,
  adminAuthenticate,
  customizeController.uploadSlideImage
);
router.post("/dashboard-data", customizeController.getAllData);

module.exports = router;
