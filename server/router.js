const express = require("express");
const {
  getAllProducts,
  postProduct,
  patchProduct,
  deleteProduct,
  getProductById,
  getProductByName
} = require("./controllers/ProductController");
const router = express.Router();

module.exports = () => {
  // ProductController:
  router.get("/get-all-products", getAllProducts);
  router.get("/get-product-id/:_id", getProductById);
  router.get("/get-product-name/:name", getProductByName);
  router.post("/post-product", postProduct);
  router.patch("/patch-product/:_id", patchProduct);
  router.delete("/delete-product/:_id", deleteProduct);

  return router;
};
