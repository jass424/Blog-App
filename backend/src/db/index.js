const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('mongodb connected successfully✅');
    } catch (error) {
        console.log('mongodb connection failed', error);
    }
};

module.exports = connectDB;
