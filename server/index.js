// "mongodb+srv://takinyemi:testtest123@takinyemi.pusugn7.mongodb.net/?retryWrites=true&w=majority&appName=takinyemi";
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log(`Application is running on port ${process.env.PORT}`)
})