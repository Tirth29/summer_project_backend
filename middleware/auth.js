import { User } from "../models/User.js";
import ErrorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";
import { asyncError } from "./error.js";

export const isAuthenticated = asyncError(async (req, res, next) => {

  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Not Logged In", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

export const isAdmin = asyncError(async (req, res, next) => {
  if (req.user.role !== "admin")
    return next(new errorHanlder("Only Admin allowed", 401));
  next();
});