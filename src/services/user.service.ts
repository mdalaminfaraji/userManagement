import { User } from '../Models/user.model';
import IUsers from '../interfaces/user.interface';

const createUser = async (userData: IUsers): Promise<IUsers> => {
  const result = await User.create(userData);
  return result;
};

const getAllUser = async (): Promise<IUsers[]> => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string): Promise<IUsers | null> => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (
  id: string,
  updatedData: IUsers
): Promise<IUsers | null> => {
  const result = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUser = async (id: string): Promise<IUsers | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
