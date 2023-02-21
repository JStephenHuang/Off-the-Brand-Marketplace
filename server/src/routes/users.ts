import { Router, Request, Response } from "express";
import { User } from "../models/user";
import { isAuthenticated } from "../middlewares/is-authenticated";
import { Listing } from "../models/listing";

const router = Router();

//* Onboard User

router.get("/current", isAuthenticated, async (req: Request, res: Response) => {
  const user = req.user;

  return res.status(200).json(user);
});

router.get(
  "/listings",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const listings = await Listing.find({
      seller: req.user._id,
      status: "active",
    }).populate("seller");
    if (!listings)
      return res.status(400).json("ClientError: user listings not found.");

    return res.status(200).json(listings);
  }
);

export { router };
