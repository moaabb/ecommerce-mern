import { Router } from 'express'
import { getProducts, getProductByID, deleteProduct, updateProduct, createProduct, createProductReview } from '../controllers/productsController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', getProducts)
router.post('/', protect, admin, createProduct)
router.post('/:id/reviews', protect, createProductReview)
router.get('/:id', getProductByID)
router.delete('/:id', protect, admin, deleteProduct)
router.put('/:id', protect, admin, updateProduct)

export default router