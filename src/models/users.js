import mongoose from 'mongoose';
const { Schema } = mongoose;

const UsersSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
    }
});

export const Users = mongoose.model('Users', UsersSchema);
