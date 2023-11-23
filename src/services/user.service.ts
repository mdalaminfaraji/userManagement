import { User } from '../Models/user.model';
import IUsers from '../interfaces/user.interface';

const createUser = async (userData: IUsers): Promise<IUsers> => {
  const result = await User.create(userData);
  return result;
};

const getAllUser = async (): Promise<IUsers[]> => {
  const result = await User.find().select(
    'username fullName age email address -_id'
  );
  return result;
};

const getSingleUser = async (userId: number): Promise<IUsers | null> => {
  const result = await User.findOne({ userId: userId });
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
  );
  return result;
};

const deleteUser = async (userId: number): Promise<IUsers | null> => {
  const user = await User.findOne({ userId: userId });
  if (!user) {
    return null;
  }
  user.isDeleted = true;
  const result = await user.save();
  return result;
};

export const userServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
