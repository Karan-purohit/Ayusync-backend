import mongoose from "mongoose";

const dbConnect = async () => await mongoose.connect(process.env.DB_URI);

export default dbConnect;
