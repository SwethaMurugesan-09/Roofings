import express from 'express'
import upload from '../config/multer.js'
import { addProduct , getProduct,getProductById } from '../controller/product.js'

const router =express.Router()

router.post('/add-product',upload.single('image') ,addProduct)

router.get('/getProduct',getProduct)
router.get("/getProduct/:id", getProductById);

export default router
