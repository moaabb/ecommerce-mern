import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protect = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.decode(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            res.status(401).json({error: "unauthorized access, token failed"})
        }

    } 

    if (!token) {
        res.status(401).json({error: "unauthorized access"})
    }


}

export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).json({error: "unauthorized access, not an Admin"})
    }
}