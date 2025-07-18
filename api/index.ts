import { createApp } from '../src/app';
import { Request, Response } from 'express';

let cachedApp: any;

export default async function handler(req: Request, res: Response){
    if(!cachedApp){
        cachedApp = await createApp();
    };
    cachedApp(req, res);
}