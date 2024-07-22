const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Rute untuk mendapatkan semua produk
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

// Rute untuk menambahkan produk
router.post('/', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
});

// Rute untuk mendapatkan detail produk
router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).send('Produk tidak ditemukan');
    }
    res.send(product);
});

// Rute untuk mengupdate produk
router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    if (!product) {
        return res.status(404).send('Produk tidak ditemukan');
    }
    res.send(product);
});

// Rute untuk menghapus produk
router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    await Product.findByIdAndRemove(productId);
    res.send('Produk berhasil dihapus');
});

module.exports = router;
