// "mongodb+srv://takinyemi:testtest123@takinyemi.pusugn7.mongodb.net/?retryWrites=true&w=majority&appName=takinyemi";
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import requestRouter from './routes/requests.js'
import settingsRouter from './routes/settings.js'
import dotenv from 'dotenv'
import connectToDatabase from './db/db.js'

// change MONGO_URL -> MONGO_URI
// and install dotenv and configure it 

dotenv.config() // load environment variables

connectToDatabase() // connects to database
const app = express()
app.use(cors())
app.use('/uploads', express.static('public/uploads'))

app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/requests', requestRouter)
app.use('/api/settings', settingsRouter)

app.listen(process.env.PORT, () => {
    console.log(`Application is running on port ${process.env.PORT}`)
})