import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/UsersModel';
import { Post } from '../models/PostsModel';

export const register = async (req: Request, res: Response)=>{
    try{
        const password = 123456;
        const cryptedPassword = await bcrypt.hash(password.toString(), 10);
        const payload = {
            username:'superman',
            email:'super@mail.com',
            password:cryptedPassword
        }
        await User.create(payload);
    }catch(error){
        console.log(error);
        res.json({message: 'error'})
    }
    res.json({message: 'new account'})
};

export const login = async (req: Request, res: Response)=>{
    const enteredPassword = req.body.password;
    const email = req.body.email;
    try{
        const user = await User.findOne({email: email});
        if(user){
            const dbPassword = user.password;
            const passwordCheck = bcrypt.compareSync(enteredPassword, dbPassword);
            if(passwordCheck){
                res.json({message: 'pass'});
            }else{
                res.json({message: 'wrong password'});
            };
        }else{
            res.json({message: 'no user found'});
        }
    }catch(error){
        console.log(error);
        res.json({message: 'error'})
    }
};

export const getAllPosts = async (req: Request, res: Response) => {
    res.json({message: 'all posts'})
};

export const createNewPost = async (req: Request, res: Response)=>{
    const data = req.body;
    console.log(data);
    try{
        const payload = {
            title: (Math.random() * 100).toFixed(2),
            body: (Math.random() * 100),
            email: 'bat@mail.com',
        }
        await Post.create(payload);
        res.json({message: 'created'})
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}