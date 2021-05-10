import { Router } from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile, getAllUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = Router()

router.post('/', registerUser)
router.get('/', protect, admin, getAllUsers)
router.get('/:id', protect, admin, getUserById)
router.put('/:id', protect, admin, updateUser)
router.delete('/:id', protect, admin, deleteUser)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)


export default router