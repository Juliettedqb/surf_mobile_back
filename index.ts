import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { log } from 'console';
import { request } from 'http';
import {surfSpot} from './models/surfSpot'
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
   // Instead of using req.body, access query parameters or path parameters
   const { queryParam1, queryParam2 } = req.query;
   // Use the query parameters as needed
   console.log(queryParam1, queryParam2);
   // Example: Use query parameters to filter the surfSpot.find() query
   const surfSpots = await surfSpot.find({ param1: queryParam1, param2: queryParam2 });
   res.json(surfSpots);
 });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});