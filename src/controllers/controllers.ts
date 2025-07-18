import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
            const passwordCheck = await bcrypt.compare(enteredPassword, dbPassword);
            if(passwordCheck){
                const token = jwt.sign({
                    id: user._id,
                    email: req.body.email,
                }, process.env.JWT_SECRET, {expiresIn: '30m'});

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 900000
                });
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

export const logout = async (req: Request, res: Response)=>{
    console.log(req.body);

    res.clearCookie('token',{
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });

    res.json({message: 'logout function end'});
};

export const getAllPosts = async (req: Request, res: Response) => {
    try{
        const data = await Post.find({});
        res.json(data);
    }catch(error){
        console.log(error);
        res.json({message: 'error', error: error})
    };
};

export const singlePost = async (req: Request, res: Response)=>{
    try{
        const singlePost = await Post.findById({_id: req.params.id});
        console.log(singlePost);
        res.json(singlePost);
    }catch(error){
        console.log(error)
    }
    res.json({message: 'finished'})
}

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
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction)=>{
    console.log('middleware');

    next();
}