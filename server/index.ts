import express from "express";
import mongoose from "mongoose";
const app = express();

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoute from './routes/auth';

app.use(cors());
app.use(express.json());

const port : string | undefined  = process.env.PORT;
const url : string | undefined = process.env.MONGO_URL;

app.use('/auth', authRoute);

mongoose.connect(url || '')
.then(() => {
  console.log('connection established');
})
.catch(() => {
  console.log("error establishing connection");
})

app.listen(port, () => {
  console.log(`server listening at port : ${port}`);
});
