import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import users from './data/users.js'
import products from './data/products.js'
import colors from 'colors'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        await Product.insertMany(products.map(product => {
           return {...product, user: adminUser}
        }))
        
        console.log('Data imported'.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error: ${error.message}`.red.inverse)
        process.exit(1)
    }
    
}

const destroyData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log(`Data Destroyed`.blue.inverse);
        process.exit()
    } catch (err) {
        console.log(`Error: ${error.message}`.bold.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}