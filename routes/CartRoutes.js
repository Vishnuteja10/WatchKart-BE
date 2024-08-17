const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  removeCartItems,
  deleteCartItem
} = require("../Controllers/Cart");
const VerifyAuthentication = require("../Middlewares/VerifyAuthentication");

router.route("/add-to-cart").post(VerifyAuthentication,addToCart);

router.route("/get-cartitems/:id").get(getCartItems);

router.route("/clear-cartitems").delete(removeCartItems);

router.route("/removeItem/:userId/:cartItemId").delete(deleteCartItem)

module.exports = router;
