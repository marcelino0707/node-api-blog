const express = require('express')
const route = express.Router()
const multer = require('multer')

const auth = require('./controllers/authenticationController')
const news = require('./controllers/newsController')
const slider = require('./controllers/sliderController')
const category = require('./controllers/categoryController')
const product = require('./controllers/productController')

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'public/assets/');
    },
    filename: (req, file, next) => {
        const uniqueSuffix = Math.round(Math.random() * 1E9)
        next(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
})

upload = multer({storage : storage})

//------ Category ------
route.get('/category', auth.verifySecretToken, category.getAll)
route.post('/category', auth.verifySecretToken, category.create)
route.get('/category/:id', auth.verifySecretToken, category.getById)
route.patch('/category/:id', auth.verifySecretToken, category.update)
route.delete('/category/:id', auth.verifySecretToken, category.delete)

//------ News ------
route.get('/news', auth.verifySecretToken, news.getAll)
route.post('/news', auth.verifySecretToken, news.create)
route.get('/news/:id', auth.verifySecretToken, news.getById)
route.patch('/news/:id', auth.verifySecretToken, news.update)
route.delete('/news/:id', auth.verifySecretToken, news.delete)

//------ Slider ------
route.get('/slider', auth.verifySecretToken, slider.getAll)
route.post('/slider', auth.verifySecretToken, upload.single('fImage'), slider.create)
route.get('/slider/:id', auth.verifySecretToken, slider.getById)
route.patch('/slider/:id', auth.verifySecretToken, upload.single('fImage'), slider.update)
route.delete('/slider/:id', auth.verifySecretToken, slider.delete)

//------ Product ------
route.get('/product', auth.verifySecretToken, product.getAll)
route.post('/product', auth.verifySecretToken, upload.single('fImage'), product.create)
route.get('/product/:id', auth.verifySecretToken, product.getById)
route.patch('/product/:id', auth.verifySecretToken, upload.single('fImage'), product.update)
route.delete('/product/:id', auth.verifySecretToken, product.delete)

module.exports = route