import { Router } from "express";
import { verifyId } from "../middlewares/idMiddlewares.js";
import { getLastMessage } from "../controllers/chatController.js";

const router = Router();

router.get('/lastMessages', verifyId, getLastMessage);

export default router;