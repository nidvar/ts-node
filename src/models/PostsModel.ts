import mongoose, {Schema, Document} from 'mongoose';

interface IPost extends Document {
    title: String
    body: String
    email: String
    replies: [String]
    image: {
        data: Buffer | null
        contentType: String
    }
}

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    replies:{
        type:[String],
        default:function(): string[]{
            return []
        }
    },
    image:{
        data: {
            type: Buffer,
            default: null
        },
        contentType: {
            type: String,
            default: ''
        }
    }
},{timestamps:true});

export const Post = mongoose.model('Post', PostSchema);