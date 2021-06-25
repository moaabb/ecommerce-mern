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
        res.status(401).json({
            error: "invalid email or"
        })
    
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

// @desc Update user profile
// @Route PUT /api/users/profile
// @access Private

export const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id)
    
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }


        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id) 
        })

        
    } else {
        res.json(401).json({
            message: "User not found"
        })
    }
}

// @desc Get all users
// @Route GET /api/users
// @access Private/Admin

export const getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.json(users)
}

// @desc Delete a user
// @Route DELETE /api/users/:id
// @access Private/Admin

export const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    
    if (user) {
        await user.remove()
        res.json({message: "User deleted"})
    } else {
        res.status(404)
        res.json({error: "User not found"})
    }

}

// @desc Get User by ID
// @Route get /api/users/:id
// @access Private/Admin

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({error: "not found"})
    }

}

// @desc Update user profile
// @Route PUT /api/users/:id
// @access Private/Admin

export const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin


        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin, 
        })

        
    } else {
        res.json(401).json({
            message: "User not found"
        })
    }
}