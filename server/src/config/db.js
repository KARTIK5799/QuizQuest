const mongoose = require ("mongoose");

const MONGO_URL=process.env.MONGO_URL  || "mongodb://localhost:27017/quizquest"


const connectDb= async () =>{
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.log('MongoDB connection error:', err.message);
        process.exit(1);
    }
}
module.exports=connectDb