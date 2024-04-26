import express from 'express'
import colors from 'colors'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import ProductRoutes from './routes/productRoutes.js'
import PaymentRoutes from './routes/paymentRoutes.js'
import userRoutes from './routes/userRoutes.js'
import path from 'path'


dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static(path.join(__dirname, './client/build')))

app.use('/api/v1/auth', authRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", ProductRoutes)
app.use("/api/v1/payment", PaymentRoutes)
app.use("/api/v1/userss", userRoutes)


app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})
app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})