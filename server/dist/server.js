"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routes/router"));
const cors_1 = __importDefault(require("cors"));
const ErrorMiddleware_1 = require("./middlewares/ErrorMiddleware");
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
// middlewares for the application
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms"));
// add all routes for the application
(0, router_1.default)(app);
// add Custom Error Handler middleware
app.use(ErrorMiddleware_1.errorHandler);
exports.default = app;
