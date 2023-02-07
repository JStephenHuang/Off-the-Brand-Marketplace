import { Router, Request, Response } from "express";
import { isAuthenticated } from "../middlewares/is-authenticated";
import { Message } from "../models/message";

const router = Router();

router.get("/", isAuthenticated, async (req: Request, res: Response) => {
  const messages = await Message.find({
    recipients: { $in: [req.user._id, req.query.userId] },
    productId: req.query.productId,
  });

  return res.status(200).json(messages);
});

router.post("/", isAuthenticated, async (req: Request, res: Response) => {
  const { userId, productId, content } = req.body;

  if (!userId) return res.status(400).json("ClientError: missing receiver id.");
  if (!productId)
    return res.status(400).json("ClientError: missing product id.");
  if (!content) return res.status(400).json("ClientError: missing content.");

  await Message.create({
    recipients: [req.user._id, userId],
    sender: req.user._id,
    receiver: userId,
    productId: productId,
    content: content,
  });
});

export { router };
