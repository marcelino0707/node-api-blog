const News = require('../models/news')
const usableFunctions = require('../helper/usableFunctions')
const fs = require('fs')
const path = require('path')
const __basedir = path.resolve()

exports.getAll = async (req, res) => {
    try {
        const data = await News.getAll()
        let news = []
        data.forEach(item => {
            item.fConten = usableFunctions.potongDeskripsi(item.fConten, 60)
            news.push(item);
        });
        return res.status(200).json({
            data: news
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Error to get news',
        })
    }
}

exports.getById = async (req, res) => {
    try {
        const news = await News.getById(req.params.id)

        if (news.length == 0) {
            return res.status(400).json({
                message: "Gagal mendapatkan data"
            })
        }

        return res.status(200).json({
            data: news
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Error to get news',
        })
    }
}

exports.create = async (req, res) => {
    try {
        if (!req.body.fJudul) {
            return res.status(400).json({
                message: 'Judul tidak boleh kosong!',
            });
        }

        const news = {
            fJudul: req.body.fJudul,
            fConten: req.body.fConten,
            fImage: "",
            fKategori: req.body.fKategori,
            fStatus: req.body.fStatus || "Publish",
            fPenulis: req.body.fPenulis,
        }

        if (req.file) {
            news.fImage = req.file.filename
        }

        news.fSlug = generateSlug(news.fJudul)
    
        await News.create(news);

        return res.status(201).json({
            message: "Berita berhasil ditambahkan!",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Some error occurred while creating the news',
        })
    }
}

exports.update = async (req, res) => {
    try {
        const oldNews = await News.getById(req.params.id)

        if(oldNews.length == 0) {
            return res.status(404).json({
                message: "News not found!"
            })
        }

        const news = {
            fJudul: req.body.fJudul || oldNews[0].fJudul,
            fSlug: oldNews[0].fSlug,
            fConten: req.body.fConten || oldNews[0].fConten,
            fImage: oldNews[0].fImage,
            fKategori: req.body.fKategori || oldNews[0].fKategori,
            fStatus: req.body.fStatus || oldNews[0].fStatus,
            fPenulis: req.body.fPenulis || oldNews[0].fPenulis,
        };

        if (req.file) {
            news.fImage = req.file.filename
        }

        if(req.body.fJudul) {
            news.fSlug = generateSlug(news.fJudul)
        }
        
        await News.update(req.params.id, news)

        if (news.fImage != "") {
            // delete old image
            const oldImagePath = path.join(__basedir, 'public', 'assets', oldNews[0].fImage)
            await fs.unlink(oldImagePath, (err) => {
                if (err) {
                    throw err;
                }
            });
        }

        return res.status(200).json({
            message: "Berhasil mengubah data berita",
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Error to update news',
        })
    }
}
    
exports.delete = async (req, res) => {
    try {
        const news = await News.delete(req.params.id)

        if (news.changedRows == 0) {
            return res.status(404).json({
                message: "News not found"
            })
        }

        return res.status(200).json({
            message: "Berhasil menghapus data berita",
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Error to get news',
        })
    }
};

function generateSlug(judul) {
    // Mengubah huruf kapital menjadi huruf kecil
    let slug = judul.toLowerCase();
    
    // Menghapus karakter selain huruf, angka, spasi, dan tanda hubung (-)
    slug = slug.replace(/[^a-z0-9\s-]/g, '');
  
    // Menggabungkan beberapa spasi menjadi satu tanda hubung (-)
    slug = slug.replace(/\s+/g, '-');

    return slug;
}



