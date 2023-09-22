"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import All Routes
const user_routes_1 = __importDefault(require("./user.routes"));
const product_routes_1 = __importDefault(require("./product.routes"));
const order_routes_1 = __importDefault(require("./order.routes"));
// Middlewares
const IsAuth_1 = require("../middlewares/IsAuth");
function InjectRoutes(app) {
    app.use("/api/auth", user_routes_1.default);
    app.use("/api/products", product_routes_1.default);
    //Protected Route
    app.use("/api/orders", IsAuth_1.isAuth, order_routes_1.default);
}
exports.default = InjectRoutes;
