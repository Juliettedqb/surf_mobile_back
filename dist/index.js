"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const surfspot_1 = require("./models/surfspot");
dotenv_1.default.config();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
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
    .connect(`mongodb+srv://juliettedqb:${dbPassword}@cluster0.psamih5.mongodb.net/waverider?retryWrites=true&w=majority`)
    .then((res) => {
    console.log("Mongoose connected");
})
    .catch((err) => {
    console.error(err);
});
// get all surf spots 
app.get('/surfSpot', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allSurfSpot = yield surfspot_1.SurfSpot.find();
    res.json(allSurfSpot);
}));
// post a surf spot in DB
app.post('/surfSpot', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const surfSpotParams = req.body;
    const surfSpot = new surfspot_1.SurfSpot(surfSpotParams);
    yield surfSpot.save();
    res.json(surfSpot);
}));
// // Define the GET method with query parameters
// example how should http request to get the closest location
// http://localhost:3000/closest-spot?latitude=47.218371&longitude=-1.553621
app.get('/closest-spot', (req, res) => {
    const latitude = parseFloat(req.query.latitude);
    const longitude = parseFloat(req.query.longitude);
    // Check if latitude and longitude are valid numbers
    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ message: 'Invalid latitude or longitude' });
    }
    // Find the closest surf spot based on the given latitude and longitude
    surfspot_1.SurfSpot.findOne({
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
        }
        else {
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
