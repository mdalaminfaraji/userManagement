interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}

interface IUsers {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };

  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };

  isDeleted: boolean;
  orders: IOrder[];
}

export default IUsers;
