const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
const multer = require("multer");
const { loginCheck, adminAuthenticate } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/all-product", productController.getAllProduct);
router.post("/product-by-category", productController.getProductByCategory);
router.post("/product-by-price", productController.getProductByPrice);
router.post("/wish-product", productController.getWishProduct);
router.post("/cart-product", productController.getCartProduct);
router.post("/add-review", productController.postAddReview);
router.post("/single-product", productController.getSingleProduct);

//ADMIN PERMISSIONS
router.post(
  "/add-product",
  upload.any(),
  loginCheck,
  adminAuthenticate,
  productController.postAddProduct
);
router.post(
  "/edit-product",
  upload.any(),
  loginCheck,
  adminAuthenticate,
  productController.postEditProduct
);
router.post(
  "/delete-product",
  loginCheck,
  adminAuthenticate,
  productController.getDeleteProduct
);
router.post(
  "/delete-review",
  loginCheck,
  adminAuthenticate,
  productController.deleteReview
);

module.exports = router;
