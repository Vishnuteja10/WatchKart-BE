const mongoose = require("mongoose");

const databaseSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  ratingInfo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    
  },
  type: {
    type: String,
   
  },
  features: [{ type: String }],
  available: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  images: [{ type: String }],
  featured: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("CartItem", databaseSchema);
