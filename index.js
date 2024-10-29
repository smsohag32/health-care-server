import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDb } from "./config/dbConnect.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 3100;

const corsOptions = {
   origin: "*",
   credentials: true,
   optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

connectDb();

app.get("/", (req, res) => {
   res.send("server is running");
});

app.use("/file", express.static("file"));

// api

app.listen(port, async () => {
   console.log("server is running");
});
