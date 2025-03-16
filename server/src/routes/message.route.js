import { Router } from "express";

import { getAllPrvMessages, getAllUsersExpectMe, sendMsg } from "../controllers/message.controller.js";
import tokenVerifier from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';


const router = Router();

router.get("/getallusers", tokenVerifier, getAllUsersExpectMe);

router.get("/allmessages/:id", tokenVerifier, getAllPrvMessages);

router.post("/send/:id", upload.fields([
    {
        name: "image",
        maxCount: 1
    }
]), tokenVerifier, sendMsg);

export default router;