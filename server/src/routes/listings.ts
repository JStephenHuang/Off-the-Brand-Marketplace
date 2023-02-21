import { Router, Request, Response } from "express";
import { IListingForm } from "../../../client/src/types/types";
import { isAuthenticated } from "../middlewares/is-authenticated";
import { Listing } from "../models/listing";

const router = Router();

// ! Get all active listings

router.get("/", async (req: Request, res: Response) => {
  return res.status(200).json(await Listing.find().populate("seller"));
});

// ! GET listing by id

router.get("/:listingId", async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.listingId)
    .populate("seller")
    .catch((error) => {});
  if (!listing)
    return res.status(400).json("DatabaseError: listing does not exits.");

  return res.status(200).json(listing);
});

// ! GET listing form

router.get("/form/:listingId", async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.listingId)
    .populate("seller")
    .catch((error) => {});
  if (!listing)
    return res.status(400).json("DatabaseError: listing does not exits.");

  const listingForm = {
    headline: listing.headline,
    institution: listing.institution,
    size: listing.size,
    condition: listing.condition,
    gender: listing.gender,
    type: listing.type,
    description: listing.description,
    price: listing.price,
    seller: listing.seller,
  };

  return res.status(200).json(listingForm);
});

// ! POST a listing (create)

router.post("/", isAuthenticated, async (req: Request, res: Response) => {
  const listingForm: IListingForm = req.body;

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

// ! PUT a listing

router.put(
  "/:listingId",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const listing = await Listing.findById(req.params.listingId).catch(
      (error) => {}
    );

    if (!listing)
      return res.status(400).json("DatabaseError: listing does not exits.");

    const listingForm: IListingForm = req.body;

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
      await Listing.updateOne(
        { _id: listing._id },
        {
          ...listingForm,
          seller: req.user._id,
          status: "active",
        }
      )
    );
  }
);

// ! DELETE a listing

router.delete(
  "/:listingId",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const listing = await Listing.findById(req.params.listingId);
    if (!listing)
      return res.status(400).json("ClientError: listing not found.");

    if (listing.seller !== req.user._id)
      return res.status(400).json("ClientError: no ownership.");

    await listing.delete();
    return res.status(200).json(
      await Listing.find({
        seller: req.user._id,
        status: listing.status,
      }).populate("seller")
    );
  }
);

export { router };
