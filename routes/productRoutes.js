const express = require("express");
const router = express.Router();
const path = require("path");

const multer = require("multer");

const productController = require("../controllers/productController");

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// 1. API to insert products
router.post(
  "/products",
  upload.single("productImage"),
  productController.insertProduct
);

// 2. API to get product information by productId
router.get("/products/:productId", productController.getProductById);

// 3. API to get a list of active products (Max 10 per page)
router.get("/products", productController.getActiveProducts);

// 4. API to update the product by productId
router.put(
  "/products/:productId",
  upload.single("productImage"),
  productController.updateProductById
);

// 5. API to delete a product by productId
router.delete("/products/:productId", productController.deleteProductById);

module.exports = router;
