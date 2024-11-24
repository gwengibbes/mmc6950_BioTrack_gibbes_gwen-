import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import {dbConnection} from "@/config/db";

const {Schema} = mongoose;

const UsersSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true
    },
    emailAddress: {
        type: String,
        unique: true,
    },
    ageGroup: {
        type: String
    },
    password: {
        type: String,
    }
}, {
    timestamps: true
});

UsersSchema.pre('save', async function (next) {
    if (this.isNew)
        this.password = await bcrypt.hash(this.password, 10)
    next()
})

const modelName = 'Users'
export const Users = mongoose.models[modelName] ?? mongoose.model(modelName, UsersSchema);
