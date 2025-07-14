import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();
import dbConnect from "./config/dbConnect.js";
import authRouters from "./routes/authRoutes.js";

app.use(express.json());

app.use("/", authRouters);

dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
