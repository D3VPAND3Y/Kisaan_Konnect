const express = require('express');
const Product = require("../models/product_model");

const productRoute = express.Router();

// Get all products
productRoute.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get product by id
productRoute.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new product
productRoute.post("/", async (req, res) => {
    try {
        const product = new Product({
            title: req.body.title,
            items: req.body.items,
        });

        await product.save();
        res.json({ message: "Product added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update product
productRoute.put("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        product.title = req.body.title;
        product.items = req.body.items;

        await product.save();
        res.json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete product
productRoute.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = {
    productRoute,
};