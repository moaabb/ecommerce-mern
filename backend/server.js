import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import colors from 'colors'
import connectDB from './config/db.js'
import productRouter from './routes/productsRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'

const app = express()

dotenv.config()

// Connecting to DB


connectDB()
app.use(express.json())

// API Routes

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// Listen for requests

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))