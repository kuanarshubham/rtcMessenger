import e from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import path from 'path';


const app = e();
const PORT = process.env.PORT;

app.use(e.json({limit: '10mb'}));
app.use(e.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

const __dirname = path.resolve();

import connectDb from './db/connection.db.js';
connectDb();

import authRoute from "./routes/auth.route.js";
app.use("/api/auth", authRoute);

import messageRoute from "./routes/message.route.js";
app.use("/api/message", messageRoute);

if (process.env.CURRENT_MODE === "production"){
    app.use(e.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
      });
}

app.listen(PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});