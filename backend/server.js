import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import colors from 'colors'
import connectDB from './config/db.js'
import productRouter from './routes/productsRoutes.js'

const app = express()

dotenv.config()

// Connecting to DB

connectDB()

// API Routes

app.use('/api/products', productRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))