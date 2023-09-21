import prisma from "../config/prismaClient";
import { OmitedUser, User } from "../types";
import { generateJWT, hashPassword, comparePwd } from "../helper/util";
import { Response } from "express";
import { IRequest } from "../types/IRequest";

/**
 * @
 */
const registerUser = async (req: IRequest, res: Response) => {
  const userBody: User = req.body;
  if (!userBody.email || !userBody.password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }
  //check if user already exists
  const userExist = await prisma.user.findUnique({
    where: { email: userBody.email },
    select: { email: true },
  });

  if (userExist) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hshPwd = hashPassword(userBody.password);

  const user: User = await prisma.user.create({
    data: {
      username: userBody.username,
      email: userBody.email,
      password: hshPwd,
    },
  });

  return res
    .status(201)
    .json({ token: generateJWT(user.id), user: user as OmitedUser });
};

const loginUser = async (req: IRequest, res: Response) => {
  const { email, password } = req.body;

  // check if user exist:s
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  if (user.password && !comparePwd(password, user.password)) {
    return res.status(400).json({ message: "Incorrect Email or Password" });
  }

  res
    .status(200)
    .json({ token: generateJWT(user.id), user: user as OmitedUser });
};

const getMe = async (req: IRequest, res: Response) => {
  res.status(200).json(req.user);
};

export { loginUser, registerUser, getMe };
