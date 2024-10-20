import mongoose from 'mongoose';

const {Schema} = mongoose;
import {dbConnection} from "@/config/db";

const ObservationSchema = new Schema({
    birdType: String,
    timeSeen: Date,
    noOfBirds: Number,
    flyThroughs: Number,
    flyOvers: Number,
    weatherCondition: String,
    windIntensity: {
        type: String,
        // Validation to ensure that only these values are saved.
        enum: ['', 'low', 'medium', 'high'],
    },
    temperature: Number,
    cloudCover: String,
    location: String,
    photos: [{
        content: String,
        name: String,
        contentType: String
    }],
    user: {
        type: String,
        ref: 'Users'
    }
}, {
    timestamps: true
});

const modelName = 'Observations'
export const Observations = mongoose.models[modelName] ?? mongoose.model(modelName, ObservationSchema);