import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import {dbConnection} from "@/config/db";

const {Schema} = mongoose;

    const BirdMatchQuestionsSchema = new Schema({
        title: String,
        image: String,
        answers: [{
            _id: {
                type: Schema.Types.ObjectId,
                index: true,
                required: true,
                auto: true,
            },
            title:{
                type: String,
            },
            isCorrect: Boolean,
        }],
    }, {
        timestamps: true
    });

    BirdMatchQuestionsSchema.pre('save', async function (next) {
        if (this.isNew)
            this.password = await bcrypt.hash(this.password, 10)
        next()
    })

    const modelName = 'BirdMatchQuestions'
    export const BirdMatchQuestions = mongoose.models[modelName] ?? mongoose.model(modelName, BirdMatchQuestionsSchema);
