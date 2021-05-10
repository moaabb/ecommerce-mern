import { Router } from 'express'
import { addOrderItems, getOrderByID, getUserOrders, updateOrderToPaid } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/', protect, addOrderItems)
router.get('/myorders', protect, getUserOrders)
router.get('/:id', protect, getOrderByID)
router.put('/:id/pay', protect, updateOrderToPaid)


export default router