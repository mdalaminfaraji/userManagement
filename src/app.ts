import express from 'express';
import { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'server is running',
  });
});

export default app;
