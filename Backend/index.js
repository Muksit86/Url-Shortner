import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import dbConnect from './Controllers/db.js';
import urlRouter from './Routes/url.js';
import userRouter from './Routes/user.js';

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
dbConnect()

//Routes
app.use("/auth/user", userRouter)
app.use("/api", urlRouter)

//Listen to port
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})

