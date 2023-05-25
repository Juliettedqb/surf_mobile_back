import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { log } from 'console';
import { request } from 'http';
import {SurfSpot} from './models/surfspot'
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

app.get('/surfSpot', async (req: Request, res: Response) => {
  const allSurfSpot = await SurfSpot.find();
  res.json(allSurfSpot)
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});