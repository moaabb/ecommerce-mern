import { Router } from 'express'
import { addOrderItems, getOrderByID, getUserOrders, listOrders, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/', protect, addOrderItems)
router.get('/myorders', protect, getUserOrders)
router.get('/', protect, admin, listOrders)
router.get('/:id', protect, getOrderByID)
router.put('/:id/pay', protect, updateOrderToPaid)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered)


export default router