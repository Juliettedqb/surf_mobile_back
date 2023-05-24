import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const mongoose = require('mongoose');
const app: Express = express();
const port = 3000;
const dbPassword = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://juliettedqb:${dbPassword}@cluster0.psamih5.mongodb.net/waverider?retryWrites=true&w=majority`
  )
  .then((res: Response) => {
    console.log("Mongoose connected");
  })
  .catch((err: Request) => {
    console.error(err);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is now running yay!');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});