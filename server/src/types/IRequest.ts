import { Request } from "express";
import { OmitedUser } from ".";

export interface IRequest extends Request {
  user?: OmitedUser;
}
