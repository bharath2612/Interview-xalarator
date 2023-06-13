const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  status: {
    type: String,
    enum: ["out_of_stock", "available"],
  },
  variant: {
    type: String,
    enum: ["small", "medium", "large"],
  },
});

module.exports = mongoose.model("Product", productSchema);
