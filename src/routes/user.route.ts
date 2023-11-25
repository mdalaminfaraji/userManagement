import { userController } from '../controllers/user.controller';
import express from 'express';
const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUser);
router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.updateUser);
router.put('/:userId/orders', userController.updateWithOrders);
router.get('/:userId/orders', userController.getAllOrders);
router.get('/:userId/orders/total-price', userController.calculateTotalPrice);
router.delete('/:userId', userController.deleteUser);
export const userRoutes = router;
