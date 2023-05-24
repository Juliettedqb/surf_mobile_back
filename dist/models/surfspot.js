"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.surfSpotSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
exports.surfSpotSchema = new Schema({
    Destination: String,
    Photos: Array,
    Address: String,
    Influencers: String,
    DestinationCountry: String,
    DifficultyLevel: Number,
    Location: Object,
    MagicSeaweedLink: String,
    PeakSurfSeasonEnds: String,
    SurfBreak: String
});
