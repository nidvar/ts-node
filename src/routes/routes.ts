import express from 'express';
import {getAllPosts, register, createNewPost, login} from '../controllers/controllers';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/register', register);
router.post('/create', createNewPost);
router.post('/login', login);

export default router