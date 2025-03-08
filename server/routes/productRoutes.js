import express from 'express'
import upload from '../config/multer.js'
import { addProduct , getProduct , getProductById , getUniqueCategories } from '../controller/product.js'

const router =express.Router()

router.post('/add-product',upload.single('image') ,addProduct)

router.get('/getProduct',getProduct)
router.get("/getProduct/:id", getProductById);

router.get("/categories", getUniqueCategories);

export default router
