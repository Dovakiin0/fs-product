import { Router } from "express";

import { getAll } from "../controller/product.controller";

const router = Router();

router.get("/", getAll);

export default router;
