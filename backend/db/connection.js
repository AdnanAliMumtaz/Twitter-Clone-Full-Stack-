const mongoose = require('mongoose');

const connectMongoDB = async () => {

    try {
        const db = await mongoose.connect(process.env.MONGO_URI).then((e) => { console.log('Database is connected!') });
    } catch (error) {
        console.error(`Error connecting to mongoDB: ${error.message}`);
        process.exit(1);
    }
}

module.exports = {connectMongoDB};