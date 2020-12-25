import { Router } from 'express'
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = Router()

router.post('/login', authUser)
router.post('/profile', protect, getUserProfile)
router.post('/', registerUser)
// router.get('/:id', getProductByID)

export default router