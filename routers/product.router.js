const express = require("express");
const { v4: uuidv4 } = require("uuid");
const data = require("../database/data");
const router = express.Router();
const productModel = require("../models/product.model");

router
  .route("/")
  .get((req, res) => {
    productModel
      .find({})
      .then((products) => res.json(products))
      .catch((err) => res.json({ message: err.message }));
  })
  .post((req, res) => {
    let products = req.body;
    const watch = new productModel(products);
    watch
      .save()
      .then((savedWatch) => res.status(201).json(savedWatch))
      .catch((err) => res.json({ message: err.message }));
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const productById = await productModel.findById(id);
    if (productById) {
      res.json(productById);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
  .post(async (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    let product = await productModel.findById(id);
    if (product) {
      Object.keys(updatedProduct).forEach((key) => {
        product[key] = updatedProduct[key];
      });
      try {
        const watch = new productModel(product);
        const savedWatch = await watch.save();
        res.status(200).json({
          Message: "Product updated",
          product: savedWatch,
        });
      } catch (err) {
        res.json({ message: err.message });
      }
    } else {
      res.status(404).json({ message: "product not found" });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const findProduct = await productModel.findById(id);
      const deleteProduct = await productModel.deleteOne(findProduct);
      res.status(200).json({ message: "Product deleted", deleteProduct });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  });

module.exports = router;
