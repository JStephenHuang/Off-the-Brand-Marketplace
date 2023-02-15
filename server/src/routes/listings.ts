import { Router, Request, Response } from "express";
import { IListingForm } from "../../../client/src/types/types";
import { isAuthenticated } from "../middlewares/is-authenticated";
import { Listing } from "../models/listing";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  return res.status(200).json(await Listing.find().populate("seller"));
});

router.get("/:listingId", async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.listingId)
    .populate("seller")
    .catch((error) => {});
  if (!listing)
    return res.status(400).json("DatabaseError: listing does not exits.");

  return res.status(200).json(listing);
});

router.post("/", isAuthenticated, async (req: Request, res: Response) => {
  const listingForm: IListingForm = req.body;

  console.log(listingForm);

  if (listingForm.headline === "") {
    return res.status(400).json("ClientError: missing headline.");
  }
  if (listingForm.institution === "") {
    return res.status(400).json("ClientError: missing institution.");
  }
  if (listingForm.size === "") {
    return res.status(400).json("ClientError: missing size.");
  }
  if (listingForm.type === "") {
    return res.status(400).json("ClientError: missing type.");
  }
  if (listingForm.gender === "") {
    return res.status(400).json("ClientError: missing gender.");
  }
  if (listingForm.condition === "") {
    return res.status(400).json("ClientError: missing condition.");
  }
  if (listingForm.description === "") {
    return res.status(400).json("ClientError: missing description.");
  }
  if (listingForm.price === null) {
    return res.status(400).json("ClientError: missing price.");
  }

  return res.status(200).json(
    await Listing.create({
      ...listingForm,
      seller: req.user._id,
      status: "active",
    })
  );
});

export { router };
