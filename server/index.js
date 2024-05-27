import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";

import authRoute from "./Routes/auth.js";
import postRoute from "./Routes/post.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4444
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'))

//Routes
// http://localhost: 3001/
app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.u5kwjzo.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`,
        )

        app.listen(PORT , () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start();