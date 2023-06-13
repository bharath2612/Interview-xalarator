const express = require("express");
const router = express.Router();

const { create, list, update, remove } = require("../controllers/products");

// router.get("/products", list);

// // router.post("/add/product", create);

// router.put("/update/product", update);

// router.delete("/delete/product", remove);

module.export = router;
