import type { Response, NextFunction } from "express";
import { verifyJWT } from "../helper/util";
import prisma from "../config/prismaClient";
import { IRequest } from "../types/IRequest";

export const isAuth = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (
      !req.headers.authorization &&
      !req.headers.authorization?.startsWith("Bearer")
    ) {
      next();
      return;
    }
    let token = req.headers.authorization.split(" ")[1];
    const decoded = verifyJWT(token);

    if (decoded === null) {
      next();
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(401);
      throw new Error("Not Authorized");
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
