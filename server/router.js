const express = require("express");
const {
  getAllProducts,
  postProduct,
  patchProduct,
  deleteProduct,
  getProductById,
  getProductByName,
} = require("./controllers/ProductController");
const {
  userAuthentication,
  createUser,
} = require("./controllers/UserController");
const { auth } = require("./middleware/auth");
const router = express.Router();

module.exports = () => {
  // ProductController:
  router.get("/get-all-products", auth, getAllProducts);
  router.get("/get-product-id/:_id", auth, getProductById);
  router.get("/get-product-name/:name", auth, getProductByName);
  router.post("/post-product", auth, postProduct);
  router.patch("/patch-product/:_id", auth, patchProduct);
  router.delete("/delete-product/:_id", auth, deleteProduct);

  // UserController:
  router.post("/user-authentication", userAuthentication);
  router.post("/create-user", createUser);

  return router;
};
