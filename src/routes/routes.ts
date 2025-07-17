import express from 'express';
import {getAllPosts, register, createNewPost, login, logout, authMiddleware, singlePost} from '../controllers/controllers';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/register', register);
router.post('/create', authMiddleware, createNewPost);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.get('/post/:id', singlePost);

export const mainRouter = router;