import express from 'express';
import { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './routes/user.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'server is running',
  });
});

export default app;
