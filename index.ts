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

// connection with database
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

// get all surf spots 
app.get('/surfSpot', async (req: Request, res: Response) => {
  const allSurfSpot = await SurfSpot.find();
  res.json(allSurfSpot)
});

// post a surf spot in DB
app.post('/surfSpot', async (req: Request, res: Response) => {
  const surfSpotParams = req.body;
  const surfSpot = new SurfSpot(surfSpotParams);
    await surfSpot.save();
    res.json(surfSpot);
})

// // Define the GET method with query parameters
// example how should http request to get the closest location
// http://localhost:3000/closest-spot?latitude=47.218371&longitude=-1.553621

app.get('/closest-spot', (req, res) => {
  const latitude = parseFloat(req.query.latitude as string);
  const longitude = parseFloat(req.query.longitude as string);

  // Check if latitude and longitude are valid numbers
  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: 'Invalid latitude or longitude' });
  }

  // Find the closest surf spot based on the given latitude and longitude
  SurfSpot.findOne({
    Location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      }
    }
  })
    .then((spot) => {
      if (spot) {
        res.json(spot);
      } else {
        res.status(404).json({ message: 'No surf spot found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving surf spot', error: error.message });
    });
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});