const Slider = require('../models/slider')
const fs = require('fs')
const path = require('path')
const __basedir = path.resolve()

exports.getAll = async (req, res) => {
    try {
        const sliders = await Slider.getAll()
        
        return res.status(200).json({
            data: sliders
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Error to get sliders',
        })
    }
}

exports.getById = async (req, res) => {
    try {
        const slider = await Slider.getById(req.params.id)
    
        if (slider.length == 0) {
            return res.status(404).json({
                message: "Slider not found!"
            })   
        }
    
        return res.status(200).json({
            data: slider
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Error to get slider',
        })
    }
}

exports.create = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'image cannot be empty!',
            });
        }
    
        const slider = {
            fImage: req.file.filename,
            fDeskripsi: req.body.fDeskripsi,
        }
    
        await Slider.create(slider)

        return res.status(201).json({
            message: "Slider berhasil ditambahkan!",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Some error occurred while creating the slider',
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const slider = await Slider.delete(req.params.id)

        if(slider.changedRows == 0) {
            res.status(404).json({
                message: `Slider not found!`
            })
        }

        res.status(200).json({
            message: "Berhasil menghapus data slider",
        })

    } catch(error) {
        res.status(500).json({
            message: error || 'Error to get slider',
        })
    }
};

exports.update = async (req, res) => {
    try {
        const oldSlider = await Slider.getById(req.params.id)

        if(oldSlider.length == 0) {
            return res.status(404).json({
                message: "Slider not found!"
            })  
        }
        
        const slider = {
            fImage: oldSlider[0].fImage,
            fDeskripsi: req.body.fDeskripsi || oldSlider[0].fDeskripsi,
            fStatus: req.body.fStatus || oldSlider[0].fStatus,
        }

        if (req.file) {
            slider.fImage = req.file.filename
        }

        await Slider.update(req.params.id, slider)
        
        // delete old image
        const oldImagePath = path.join(__basedir, 'public', 'assets', oldSlider[0].fImage)
        await fs.unlink(oldImagePath, (err) => {
            if (err) {
                throw err;
            }
        });

        return res.status(200).json({
            message: "Berhasil mengubah data slider",
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Error to update slider',
        })
    }
}

