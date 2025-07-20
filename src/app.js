import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import dbConnect from "./config/dbConnect.js";
import authRouters from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouters);
app.use("/", profileRoutes);

dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
