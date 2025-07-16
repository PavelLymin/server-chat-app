import { Router } from "express";
import { verifyId } from "../middlewares/idMiddlewares.js";
import { createChat, getLastMessage } from "../controllers/chatController.js";

const router = Router();

router.get('/lastMessages', verifyId, getLastMessage);
router.post('/createChat', createChat);

export default router;