import e from 'express';
import { signup, login, logout, updateProfilePic, checkAuth } from "../controllers/auth.controller.js";
import tokenVerifier from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = e.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/profile", tokenVerifier, updateProfilePic);

router.get("/check", tokenVerifier, checkAuth);

export default router;