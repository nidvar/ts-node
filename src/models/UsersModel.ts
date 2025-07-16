import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    profilePic: {
        data: {
            type: Buffer,
            default: null
        },
        contentType: {
            type: String,
            default: ''
        }
    }
}, {timestamps:true});

export const User = mongoose.model('User', UserSchema);