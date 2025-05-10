import express from 'express';
import { registerUser, loginUser, getUserById, addFavorite, removeFavorite,syncFavourites } from '../controller/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:id', getUserById);
router.post('/favorites/add', addFavorite);
router.post('/favorites/remove', removeFavorite);
router.post('/sync-favourites', syncFavourites);

export default router;
