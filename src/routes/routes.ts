import express from 'express';
import {getAllPosts, register, createNewPost, login, logout} from '../controllers/controllers';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/register', register);
router.post('/create', createNewPost);
router.post('/login', login);
router.post('/logout', logout);

export default router