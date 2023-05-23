import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const surfSpotSchema = new Schema({
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
})