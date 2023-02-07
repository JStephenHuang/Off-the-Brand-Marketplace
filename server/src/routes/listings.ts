import { Router, Request, Response } from "express";
import { IListingForm } from "../../../client/src/types/types";
import { isAuthenticated } from "../middlewares/is-authenticated";
import { Listing } from "../models/listing";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  return res.status(200).json(await Listing.find());
});

router.post("/", isAuthenticated, async (req: Request, res: Response) => {
  const listingForm: IListingForm = req.body;

  console.log(listingForm);

  if (listingForm.institution === "") {
    return res.status(400).json("ClientError: missing instituion.");
  }

  return res.status(200).json(
    await Listing.create({
      ...listingForm,
      seller: req.user.username,
      status: "active",
    })
  );
});

export { router };
