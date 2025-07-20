import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Authentication token is missing");
    }
    const decodedUserId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedUserId.userid);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: error.message || "User is not authenticated!!" });
  }
};
