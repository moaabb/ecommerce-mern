import mongoose from 'mongoose'

const dbURI = process.env.MONGO_URI

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true})

            console.log(`Connected to DB: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }

} 

export default connectDB