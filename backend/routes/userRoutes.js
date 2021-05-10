import { Router } from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile, getAllUsers } from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = Router()

router.post('/', registerUser)
router.get('/', protect, admin, getAllUsers)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)

export default router