const mongoose = require ("mongoose");

const connectDb = async () => {
try {
    const connect = await mongoose.connect(`${process.env.MONGO_URI}/userdata`);

    console.log(`MongoDB Connected ${connect.connection.host}`);
} catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
}
}

module.exports = connectDb;