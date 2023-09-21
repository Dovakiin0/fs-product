import asyncHandler from "express-async-handler";
import { IRequest } from "../types/IRequest";
import { Response } from "express";
import prisma from "../config/prismaClient";
import { OrderRequest } from "../dto/OrderRequest";

const getAll = asyncHandler(async (req: IRequest, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: req.user?.id,
      },
      include: {
        Product: true,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong!");
  }
});

const createOrder = asyncHandler(async (req: IRequest, res: Response) => {
  try {
    const { carts }: { carts: OrderRequest[] } = req.body;

    const orders = await prisma.order.createMany({
      data: carts.map((cartItem) => ({
        userId: req.user!.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        totalPrice: cartItem.total,
      })),
    });

    res.status(201).json({ success: true });
  } catch (error: any) {
    res.status(500);
    throw new Error(error);
  }
});

export { getAll, createOrder };
