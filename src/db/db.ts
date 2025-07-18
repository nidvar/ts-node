import mongoose from 'mongoose';

export const mongooseConnection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to Mongo DB");
    }catch(error){
        console.log(error);
    }
};