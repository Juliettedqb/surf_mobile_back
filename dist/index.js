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
const surfSpot_1 = require("./models/surfSpot");
dotenv_1.default.config();
const mongoose = require('mongoose');
const app = (0, express_1.default)();
const port = 3000;
const dbPassword = process.env.DB_PASSWORD;
mongoose
    .connect(`mongodb+srv://juliettedqb:${dbPassword}@cluster0.psamih5.mongodb.net/waverider?retryWrites=true&w=majority`)
    .then((res) => {
    console.log("Mongoose connected");
})
    .catch((err) => {
    console.error(err);
});
app.get('/surfSpot', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Instead of using req.body, access query parameters or path parameters
    const { queryParam1, queryParam2 } = req.query;
    // Use the query parameters as needed
    console.log(queryParam1, queryParam2);
    // Example: Use query parameters to filter the surfSpot.find() query
    const surfSpots = yield surfSpot_1.surfSpot.find({ param1: queryParam1, param2: queryParam2 });
    res.json(surfSpots);
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
