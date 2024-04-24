import mongoose from "mongoose";
import { string } from "zod";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true
    },
    password : String
})

export const User = mongoose.model('User', userSchema);