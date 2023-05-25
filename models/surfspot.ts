import mongoose from 'mongoose';

const surfSpotSchema = new mongoose.Schema({
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

// Instantiation du nouveau Schema 

export const SurfSpot = mongoose.model('surfspot', surfSpotSchema);