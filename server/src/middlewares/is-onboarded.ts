import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";

export const isOnboarded = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.uid)
    return res.status(401).json("AuthError: user is not authenticated.");

  if (!(await User.findById(req.uid)))
    return res.status(404).json("UserError: user does not exist.");

  return next();
};
