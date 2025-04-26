// "mongodb+srv://takinyemi:testtest123@takinyemi.pusugn7.mongodb.net/?retryWrites=true&w=majority&appName=takinyemi";
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import dotenv from 'dotenv'
import connectToDatabase from './db/db.js'

// change MONGO_URL -> MONGO_URI
// and install dotenv and configure it 

dotenv.config() // load environment variables

connectToDatabase() // connects to database
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)

app.listen(process.env.PORT, () => {
    console.log(`Application is running on port ${process.env.PORT}`)
})