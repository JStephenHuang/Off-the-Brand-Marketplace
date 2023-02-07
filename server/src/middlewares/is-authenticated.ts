import { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";

import { User } from "../models/user";
import crypto from "crypto";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers["authorization"];

  if (authorization === undefined)
    return res.status(401).json("AuthError: missing authorization token.");

  const [authScheme, authParams] = authorization.split(" ");

  if (authScheme !== "Bearer") {
    return res
      .status(401)
      .json("AuthError: unsupported authentication scheme.");
  }

  const auth = getAuth(admin.app());

  auth
    .verifyIdToken(authParams)
    .then(async (value) => {
      const firebaseUser = await auth.getUser(value.uid);
      const user = await User.findById(firebaseUser.uid);
      if (user !== null) {
        req.user = user;
        return next();
      }

      const username =
        firebaseUser.displayName === undefined
          ? `guest-${crypto.randomBytes(20).toString("hex")}`
          : firebaseUser.displayName;

      req.user = await User.create({
        _id: firebaseUser.uid,
        email: firebaseUser.email,
        username: username,
      });

      return next();
    })
    .catch((error) => {
      return res.status(401).json(`AuthError: ${error}.`);
    });
};
