const mongoose = require('mongoose');
const connectdb = async () => {
    try {
        const conn = await mongoose.connect(
            'mongodb+srv://takinyemi:testtest123@takinyemi.pusugn7.mongodb.net/?retryWrites=true&w=majority&appName=takinyemi');
        console.log(`MongoDB Connected`); // ac-6mvdk7n-shard-00-02.pusugn7.mongodb.net
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectdb;