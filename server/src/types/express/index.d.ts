import { IUser } from "../../models/user";

declare global {
  namespace Express {
    interface Request {
      uid: string;
      user: IUser;
    }
  }
}
