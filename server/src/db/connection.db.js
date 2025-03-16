import mongoose from "mongoose";

const connectDb = async() => {
    try{
        const connectionOp = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connection ID: ${connectionOp.connection.id}`);
    }
    catch(err){
        console.log(`Errorrr msg for MongoDB connection ---> ${err}`);
    }
}

export default connectDb;