import { User } from '../Models/user.model';
import IUsers from '../interfaces/user.interface';

const createUser = async (userData: IUsers): Promise<IUsers> => {
  const result = await User.create(userData);
  return result;
};

const getUserById = async (userId: number): Promise<IUsers | null> => {
  return User.findOne({ userId }).select('-orders').exec();
};

const getAllUser = async (): Promise<IUsers[]> => {
  const result = await User.find().select(
    'username fullName age email address '
  );
  return result;
};

const getSingleUser = async (userId: number): Promise<IUsers | null> => {
  const result = await User.findOne({ userId: userId }).select('-orders');
  return result;
};

const updateUser = async (
  userId: number,
  updatedData: IUsers
): Promise<IUsers | null> => {
  const result = await User.findOneAndUpdate(
    { userId: userId },
    { $set: updatedData },
    { new: true, runValidators: true }
  ).select('-orders');
  return result;
};

const deleteUser = async (userId: number): Promise<IUsers | null> => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return null;
    }

    user.isDeleted = true;

    const result = await user.save();

    return result;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

const updateWithOrders = async (
  userId: number,
  updatedData: Object
): Promise<IUsers | null> => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: updatedData } },
    { new: true, runValidators: true }
  );
  return result;
};

const getAllOrders = async (userId: number): Promise<IUsers | null> => {
  const result = await User.findOne({ userId }).select('orders');

  return result;
};

const calculateTotalPrice = async (userId: number): Promise<IUsers | null> => {
  const result = await User.findOne({ userId }).select('orders');

  return result;
};

export const userServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateWithOrders,
  getUserById,
  getAllOrders,
  calculateTotalPrice,
};
