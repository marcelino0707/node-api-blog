const Product = require('../models/product');
const fs = require('fs')
const path = require('path')
const __basedir = path.resolve()

exports.getAll = async (req, res) => {
    try {
        const products = await Product.getAll()

        return res.status(200).json({
            data: products
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Error to get produk',
        })
    }
}

exports.getById = async (req, res) => {
    try {
        const product = await Product.getById(req.params.id)

        if (product.length == 0) {
            return res.status(404).json({
                message: "Product not found!"
            })
        }

        return res.status(200).json({
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Error to get product',
        })
    }
}

exports.create = async (req, res) => {
    try {
        if (!req.body.fNamaProduk) {
            return res.status(400).json({
                message: 'Nama produk tidak boleh kosong!',
            });
        }

        const product = {
            fNamaProduk: req.body.fNamaProduk,
            fDeskripsi	: req.body.fDeskripsi,
            fHarga	: req.body.fHarga,
            fImage: "",
            fKategori: req.body.fKategori,
        }

        if (req.file) {
            product.fImage = req.file.filename
        }

        await Product.create(product);

        return res.status(201).json({
            message: "Produk berhasil ditambahkan!",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Some error occurred while creating the product',
        })
    }
}

exports.update = async (req, res) => {
    try {
        const oldProduct = await Product.getById(req.params.id)

        if(oldProduct.length == 0) {
            return res.status(404).json({
                message: "Product not found!"
            })
        }

        const product = {
            fNamaProduk: req.body.fNamaProduk || oldProduct[0].fNamaProduk,
            fDeskripsi: req.body.fDeskripsi || oldProduct[0].fDeskripsi,
            fImage: oldProduct[0].fImage,
            fHarga: req.body.fHarga || oldProduct[0].fHarga,
            fKategori: req.body.fKategori || oldProduct[0].fKategori,
        };

        if (req.file) {
            product.fImage = req.file.filename
        }
        
        await Product.update(req.params.id, product)

        // delete old image
        if(product.fImage != "") {
            const oldImagePath = path.join(__basedir, 'public', 'assets', oldProduct[0].fImage)
            await fs.unlink(oldImagePath, (err) => {
                if (err) {
                    throw err;
                }
            });
        }

        return res.status(200).json({
            message: "Berhasil mengubah data produk",
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Error to update product',
        })
    }
}
    
exports.delete = async (req, res) => {
    try {
        const product = await Product.delete(req.params.id)

        if (product.changedRows == 0) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        return res.status(200).json({
            message: "Berhasil menghapus data produk",
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Error to get product',
        })
    }
};



