import express from 'express';
import { getAllNotes, createNewNote, deleteSingleNote, updateOneNote, getSingleNote } from '../controllers/notesControllers';

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getSingleNote);
router.post("/create" , createNewNote);
router.put("/update/:id" , updateOneNote);
router.delete("/delete/:id" , deleteSingleNote);

export const notesRoutes = router;