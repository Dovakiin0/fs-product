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
exports.getMe = exports.registerUser = exports.loginUser = void 0;
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const util_1 = require("../helper/util");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
/**
 * @
 */
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userBody = req.body;
    if (!userBody.email || !userBody.password) {
        res.status(400);
        throw new Error("You must enter email and password");
    }
    //check if user already exists
    const userExist = yield prismaClient_1.default.user.findUnique({
        where: { email: userBody.email },
        select: { email: true },
    });
    if (userExist) {
        res.status(409);
        throw new Error("User already Exists");
    }
    const hshPwd = (0, util_1.hashPassword)(userBody.password);
    const user = yield prismaClient_1.default.user.create({
        data: {
            username: userBody.username,
            email: userBody.email,
            password: hshPwd,
        },
    });
    res
        .status(201)
        .json({ token: (0, util_1.generateJWT)(user.id), user: user });
}));
exports.registerUser = registerUser;
const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // check if user exist:s
    const user = yield prismaClient_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        res.status(400);
        throw new Error("Incorrect Email or Password");
    }
    if (user.password && !(0, util_1.comparePwd)(password, user.password)) {
        res.status(400);
        throw new Error("Incorrect Email or Password");
    }
    res
        .status(200)
        .json({ token: (0, util_1.generateJWT)(user.id), user: user });
}));
exports.loginUser = loginUser;
const getMe = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(req.user);
}));
exports.getMe = getMe;
