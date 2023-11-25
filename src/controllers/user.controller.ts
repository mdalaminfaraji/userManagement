import { Request, Response } from 'express';
import { userServices } from '../services/user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const validatedUser = userValidationSchema.parse(userData);
    const result = await userServices.createUser(validatedUser);
    const user = await userServices.getUserById(result.userId);
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Please provide proper data',
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userServices.getSingleUser(parseInt(userId));
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedData = req.body;

    const { userId } = req.params;

    const result = await userServices.updateUser(parseInt(userId), updatedData);
    if (result) {
      res.status(201).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateWithOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedOrder = req.body;

    const result = await userServices.updateWithOrders(
      parseInt(userId),
      updatedOrder
    );

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userServices.deleteUser(parseInt(userId));
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userServices.getAllOrders(parseInt(userId));
    const resultAr = result?.orders.map((order) => ({
      productName: order.productName,
      price: order.price,
      quantity: order.quantity,
    }));

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: resultAr,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userServices.calculateTotalPrice(parseInt(userId));
    const totalPrice = result?.orders.reduce((total, order) => {
      return total + order.price * order.quantity;
    }, 0);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: totalPrice,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateWithOrders,
  getAllOrders,
  calculateTotalPrice,
};
