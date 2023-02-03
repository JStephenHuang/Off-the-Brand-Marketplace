import { Router, Request, Response } from "express";
import { User, IUser } from "../models/user";
import { isAuthenticated } from "../middlewares/is-authenticated";

const router = Router();

//* Onboard User

router.post("/", isAuthenticated, async (req: Request, res: Response) => {
  const { firstname, lastname, username, email, location, address } = req.body;

  const user = await User.findOne({ username });
  if (user) return res.status(400).send("UserError: username taken.");

  const userForm = {
    _id: req.uid,
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
    location: location,
    address: address,
  };

  await User.create(userForm);

  return res.status(200).json("UserStatus: user created");
});

export { router };
