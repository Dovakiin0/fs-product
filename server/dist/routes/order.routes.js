"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controller/order.controller");
const router = (0, express_1.Router)();
router.get("/", order_controller_1.getAll);
router.post("/", order_controller_1.createOrder);
exports.default = router;
