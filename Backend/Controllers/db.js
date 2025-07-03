import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const dbConnect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
    } catch (error) {
         console.error(err)
    }
}

export default dbConnect