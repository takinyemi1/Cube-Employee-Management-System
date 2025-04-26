// const mongoose = require('mongoose');
import mongoose from "mongoose"

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL),
        console.log(`MongoDB Connected`) // ac-6mvdk7n-shard-00-02.pusugn7.mongodb.net
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

// module.exports = connectToDatabase();
export default connectToDatabase