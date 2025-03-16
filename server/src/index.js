import e from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = e();
const PORT = process.env.PORT;

app.use(e.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


import connectDb from './db/connection.db.js';
connectDb();

import authRoute from "./routes/auth.route.js";
app.use("/api/auth", authRoute);

import messageRoute from "./routes/message.route.js";
app.use("/api/message", messageRoute);


app.listen(PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});