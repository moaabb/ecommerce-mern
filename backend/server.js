import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRouter from './routes/productsRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import morgan from 'morgan'

const app = express()

dotenv.config()

// Connecting to DB


connectDB()
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// API Routes

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/upload', uploadRoutes)


app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = `${path.resolve()}/backend`
app.use('/backend/uploads', express.static(path.join(__dirname, '/uploads')))

// Listen for requests

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))