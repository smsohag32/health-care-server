import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDb } from "./config/dbConnect.js";
import userRoute from "./routes/userRoute.js";
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

app.use("/api/v1", userRoute);

app.listen(port, async () => {
   console.log("server is running");
});
