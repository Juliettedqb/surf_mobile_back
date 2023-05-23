"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = require('mongoose');
const app = (0, express_1.default)();
const port = 3000;
mongoose
    .connect("mongodb+srv://juliettedqb:waverider_adatech@cluster0.psamih5.mongodb.net/waverider?retryWrites=true&w=majority")
    .then((res) => {
    console.log("Mongoose connected");
})
    .catch((err) => {
    console.error(err);
});
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server is now running yay!');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
