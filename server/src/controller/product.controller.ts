import asyncHandler from "express-async-handler";
import { IRequest } from "../types/IRequest";
import { Response } from "express";
import prisma from "../config/prismaClient";

const getAll = asyncHandler(async (req: IRequest, res: Response) => {
  const products = await prisma.product.findMany();
  res.status(200).json(products);
});

export { getAll };
