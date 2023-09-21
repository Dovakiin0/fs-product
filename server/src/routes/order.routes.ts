import { Router } from "express";

import { getAll, createOrder } from "../controller/order.controller";

const router = Router();

router.get("/", getAll);
router.post("/", createOrder);

export default router;
