import { userController } from '../controllers/user.controller';
import express from 'express';
const router = express.Router();

router.post('/', userController.createUser);
export const userRoutes = router;
