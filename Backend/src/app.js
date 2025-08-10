import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import dbConnect from "./config/dbConnect.js";
import authRouters from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import logRoutes from "./routes/logRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If using cookies or auth headers
  })
);

app.use("/", authRouters);
app.use("/", profileRoutes);
app.use("/", logRoutes);

dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
