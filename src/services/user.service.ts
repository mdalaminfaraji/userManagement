import { User } from '../Models/user.model';
import IUsers from '../interfaces/user.interface';

const createUser = async (userData: IUsers): Promise<IUsers> => {
  const result = await User.create(userData);
  return result;
};

export const userServices = {
  createUser,
};
