import { Router, Request, Response } from "express";
import { User } from "../models/user";
import { isAuthenticated } from "../middlewares/is-authenticated";

const router = Router();

//* Onboard User

router.get("/current", isAuthenticated, async (req: Request, res: Response) => {
  const user = req.user;

  return res.status(200).json(user);
});

export { router };
