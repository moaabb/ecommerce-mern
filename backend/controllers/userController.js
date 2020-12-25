import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


// @desc Create a new user
// @Route POST /api/users
// @access Private

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    
    let user
    
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400).json({
            message: "user already exists"
        })
        
    } else {
        user = await User.create({
            name, password, email
        })
    }

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id) 
        })
    } else {
        res.status(400).json({
            message: "invalid user data"
        })
    }
    
 }


// @desc Auth user and generate token
// @Route POST /api/users/login
// @access Public

export const authUser = async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password)) {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }   else {
        res.status(401).json({Error:'Invalid email or password'})
        
    }
   
}

// @desc Get user profile
// @Route GET /api/users/profile
// @access Private

export const getUserProfile = async (req, res) => {
   const user = await User.findById(req.user._id)
   
   if(user) {
       res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin  
       })
   } else {
       res.json(401).json({
           message: "User not found"
       })
   }
}

