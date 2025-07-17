import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
}, {timestamps: true});

export const Notes = mongoose.model('Notes', notesSchema);