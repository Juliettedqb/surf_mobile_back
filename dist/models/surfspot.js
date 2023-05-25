"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurfSpot = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const surfSpotSchema = new mongoose_1.default.Schema({
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
// Instantiation du nouveau Schema 
exports.SurfSpot = mongoose_1.default.model('surfspot', surfSpotSchema);
