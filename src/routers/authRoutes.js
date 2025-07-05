import { Router } from "express";
import { addUser } from "../controllers/authController.js";

const router = Router();

router.post('/addUser', addUser);

export default router;