const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getSelectedProduct,
  insertProducts,
} = require("../Controllers/Products");

router.route("/").get(getAllProducts);

router.route("/:id").get(getSelectedProduct);

module.exports = router;
