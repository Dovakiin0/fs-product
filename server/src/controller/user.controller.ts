import prisma from "../config/prismaClient";
import { OmitedUser, User } from "../types";
import { generateJWT, hashPassword, comparePwd } from "../helper/util";
import { Response } from "express";
import { IRequest } from "../types/IRequest";
import asyncHandler from "express-async-handler";

/**
 * @
 */
const registerUser = asyncHandler(async (req: IRequest, res: Response) => {
  const userBody: User = req.body;
  if (!userBody.email || !userBody.password) {
    res.status(400);

    throw new Error("You must enter email and password");
  }
  //check if user already exists
  const userExist = await prisma.user.findUnique({
    where: { email: userBody.email },
    select: { email: true },
  });

  if (userExist) {
    res.status(409);
    throw new Error("User already Exists");
  }

  const hshPwd = hashPassword(userBody.password);

  const user: User = await prisma.user.create({
    data: {
      username: userBody.username,
      email: userBody.email,
      password: hshPwd,
    },
  });

  res
    .status(201)
    .json({ token: generateJWT(user.id), user: user as OmitedUser });
});

const loginUser = asyncHandler(async (req: IRequest, res: Response) => {
  const { email, password } = req.body;

  // check if user exist:s
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(400);
    throw new Error("Incorrect Email or Password");
  }

  if (user.password && !comparePwd(password, user.password)) {
    res.status(400);
    throw new Error("Incorrect Email or Password");
  }

  res
    .status(200)
    .json({ token: generateJWT(user.id), user: user as OmitedUser });
});

const getMe = asyncHandler(async (req: IRequest, res: Response) => {
  res.status(200).json(req.user);
});

export { loginUser, registerUser, getMe };
