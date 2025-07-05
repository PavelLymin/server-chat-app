import {Router} from 'express';
import { verifyId } from "../middlewares/idMiddlewares.js";
import { fetchAllMessagesByChatId } from '../controllers/messageController.js';

const router = Router();

router.get('/allMessages', verifyId, fetchAllMessagesByChatId);

export default router;