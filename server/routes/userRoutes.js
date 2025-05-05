import express from 'express';
import { registerUser, loginUser, getUserById, addFavorite, removeFavorite } from '../controller/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:id', getUserById);
router.post('/favorites/add', addFavorite);
router.post('/favorites/remove', removeFavorite);

export default router;
