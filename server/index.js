// "mongodb+srv://takinyemi:testtest123@takinyemi.pusugn7.mongodb.net/?retryWrites=true&w=majority&appName=takinyemi";

const express = require('express');
const connectdb = require('./db.js');
// const itemModel = require('./models/item.js');

const app = express()
connectdb()

//-------------------//
// app.use(cors())
app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})