import { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers["authorization"];

  if (authorization === undefined)
    return res.status(401).json("AuthError: missing authorization token.");

  const [authScheme, authParams] = authorization.split(" ");

  if (authScheme !== "!Bearer") {
    return res
      .status(401)
      .json("AuthError: unsupported authentication scheme.");
  }

  getAuth(admin.app())
    .verifyIdToken(authParams)
    .then(async (value) => {
      req.uid = value.uid;

      return next();
    })
    .catch((error) => {
      return res.status(401).json(`AuthError: ${error}.`);
    });
};
