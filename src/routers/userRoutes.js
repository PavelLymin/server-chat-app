import { Router } from "express";
import { fetchUser, fetchUsers } from "../controllers/userController.js";
import { verifyId } from "../middlewares/idMiddlewares.js";

const router = Router();

router.get('/user', verifyId, fetchUser);
router.get('/users', fetchUsers);

export default router;