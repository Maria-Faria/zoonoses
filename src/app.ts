import express, { Request, Response } from "express";
import cors from 'cors';

const app = express();
const allowedOptions = ['http://localhost:3000', 'https://zoonoses-front.vercel.app'];

app.use(cors({
  origin: allowedOptions
}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Back-end rodando!");
});

export default app;