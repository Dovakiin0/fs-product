"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.getAll = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const getAll = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const orders = yield prismaClient_1.default.order.findMany({
            where: {
                userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            },
            include: {
                Product: true,
            },
        });
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500);
        throw new Error("Something went wrong!");
    }
}));
exports.getAll = getAll;
const createOrder = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carts } = req.body;
        const orders = yield prismaClient_1.default.order.createMany({
            data: carts.map((cartItem) => ({
                userId: req.user.id,
                productId: cartItem.productId,
                quantity: cartItem.quantity,
                totalPrice: cartItem.total,
            })),
        });
        res.status(201).json({ success: true });
    }
    catch (error) {
        res.status(500);
        throw new Error(error);
    }
}));
exports.createOrder = createOrder;
