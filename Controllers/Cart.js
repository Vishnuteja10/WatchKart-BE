const CartModel = require("../Models/CartModel");

const getCartItems = async (req, res) => {
  const { id } = req.params;

  console.log("user id", id, req.params);
  try {
    const items = await CartModel.find({ userId: id });
    if (items) {
      res.json({ success: true, message: "cart items found", data: items });
    } else {
      res.json({ success: false, message: "No data found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { item } = req.body;

    const product = await CartModel.findById(item._id);
    if (product) {
      product.quantity = product.quantity + 1;
      await product.save();
      return res.json({ success: true, data: product });
    }
    const cartitem = new CartModel(item);
    await cartitem.save();

    if (cartitem) {
      res.status(200).json({
        success: true,
        message: "item added to cart successfully",
        data: cartitem,
      });
    } else {
      res.json({ success: false, message: "failed to add item to cart" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const removeCartItems = async (req, res) => {
  try {
    await CartModel.deleteMany({});
    res.status(200).json({ success: true, data: "cart items cleared" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message, userId: id });
  }
};

const deleteCartItem = async (req, res) => {
  const { userId, cartItemId } = req.params;

  try {
    const deletedItem = await CartModel.findOneAndDelete({ _id: cartItemId, userId: userId });

    if (deletedItem) {
      res.status(200).json({ success: true, message: "Item deleted successfully", data: deletedItem });
    } else {
      res.status(404).json({ success: false, message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addToCart, getCartItems, removeCartItems,deleteCartItem };
