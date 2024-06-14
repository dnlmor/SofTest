const mongoose = require('mongoose');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';
dotenv.config({
    path: `.env.${env}`
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected in ${env} environment`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
