import { z } from 'zod';

const userValidationSchema = z.object({
  userId: z.number().int().positive(),
  username: z.string(),
  password: z.string().max(15),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number().int().positive(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  isDeleted: z.boolean().default(false),
});

export default userValidationSchema;
