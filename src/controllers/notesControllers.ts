import { Response, Request } from 'express';
import {Notes} from '../models/NotesModel';

export const getAllNotes = async function(req: Request, res: Response){
    try{
        const notes = await Notes.find({});
        res.json({note: notes});
    }catch(error){
        console.log(error);
    }
};

export const getSingleNote = async function(req: Request, res: Response){
    try{
        const singleNote = await Notes.findById({_id: req.params.id});
        res.json({note: singleNote});
    }catch(error){
        console.log(error);
    }
};

export const createNewNote = async function(req: Request, res: Response){
    try{
        const payload = {
            title: req.body.title,
            body: req.body.body,
            username: 'batman',
            email: 'bat@mail.com'
        };
        await Notes.create(payload);
        res.json({message: "Note created"});
    }catch(error){
        console.log(error);
    }
};

export const deleteSingleNote = async function(req: Request, res: Response){
    try{
        await Notes.findByIdAndDelete({_id: req.body.id});
        res.json({message: "deleted Single Note"});
    }catch(error){
        console.log(error);
    }
};

export const updateOneNote = async function(req: Request, res: Response){
    try{
        await Notes.findByIdAndUpdate(req.params.id, { title: req.body.title, body: req.body.body });
        res.json({message: "Note updated"});
    }catch(error){
        console.log(error);
    }
};