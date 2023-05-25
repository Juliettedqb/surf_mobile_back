import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { log } from 'console';
import { request } from 'http';
import {SurfSpot} from './models/surfspot'
dotenv.config();

const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app: Express = express();
const port = 3000;
const dbPassword = process.env.DB_PASSWORD;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// allow CORS from all
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  // allow cors for put
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

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

app.post('/surfSpot', async (req: Request, res: Response) => {
  const surfSpotParams = req.body;
  const surfSpot = new SurfSpot(surfSpotParams);
    await surfSpot.save();
    res.json(surfSpot);
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});