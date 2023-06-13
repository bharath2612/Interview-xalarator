const Product = require("../schema");

exports.create = async (req, res) => {
  try {
    console.log("BODY", req.body.product);
    const newProduct = await new Product(req.body.product).save();
    console.log("New Product", newProduct);
    res.status(200).json({
      status: "success",
      message: newProduct,
    });
  } catch (e) {
    console.log("ADDING PRODUCT ERROR", e);
  }
};

exports.update = async (req, res) => {
  try {
    const updateProduct = await Product.findOneAndUpdate(
      {
        _id: req.headers.id,
      },
      req.body.product,
      { new: true }
    );
    console.log("Updated Product", updateProduct);
    res.status(200).json({
      status: "success",
      message: updateProduct,
    });
  } catch (e) {
    console.log("UPDATING PRODUCT ERROR", e);
  }
};

exports.list = async (req, res) => {
  try {
    let products = await Product.find({});

    res.status(200).json({
      status: "success",
      message: products,
    });
  } catch (e) {
    console.log("ADDING PRODUCT ERROR", e);
  }
};

exports.remove = async (req, res) => {
  try {
    const removeProduct = await Product.findOneAndRemove({
      _id: req.headers.id,
    });
    console.log("Deleted Product", removeProduct);
    res.status(200).json({
      status: "success",
      message: removeProduct,
    });
  } catch (e) {
    console.log("ADDING PRODUCT ERROR", e);
  }
};
