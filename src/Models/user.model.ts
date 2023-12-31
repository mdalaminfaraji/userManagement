import { Schema, model } from 'mongoose';
import IUsers from '../interfaces/user.interface';
import config from '../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<IUsers>({
  userId: {
    type: Number,
    required: [true, 'UserId is Required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'UserName is Required'],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'Password is Required'],
    maxlength: [100, 'Password must be less than 15 character'],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'FirstName is Required'],
    },
    lastName: {
      type: String,
      required: [true, 'lastName is Required'],
    },
  },

  age: {
    type: Number,
    required: [true, 'Age is Required'],
  },
  email: {
    type: String,
    required: [true, 'User Email is Required'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: [
    {
      type: String,
    },
  ],
  address: {
    street: {
      type: String,
      required: [true, 'Street is Required'],
    },
    city: {
      type: String,
      required: [true, 'Street is Required'],
    },
    country: {
      type: String,
      required: [true, 'Street is Required'],
    },
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

  orders: {
    type: [
      {
        productName: String,
        price: Number,
        quantity: Number,
      },
    ],
    default: [],
  },
});

// pre save middleware/hook

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// Query Middleware

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('findOneAndUpdate', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// Middleware to exclude password field from response
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.isDeleted;
  delete user._id;
  delete user.__v;
  return user;
};

export const User = model<IUsers>('User', userSchema);
