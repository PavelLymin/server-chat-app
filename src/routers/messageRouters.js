import {Router} from 'express';
import { verifyId } from "../middlewares/idMiddlewares.js";
import { deleteMessage, fetchAllMessagesByChatId } from '../controllers/messageController.js';

const router = Router();

router.get('/allMessages', verifyId, fetchAllMessagesByChatId);

router.post('/delete', verifyId, deleteMessage);


export default router;