import type { Application } from "express";

// Import All Routes
import UserRoute from "./user.routes";
import ProductRoute from "./product.routes";
import OrderRouter from "./order.routes";

// Middlewares
import { isAuth } from "../middlewares/IsAuth";

export default function InjectRoutes(app: Application) {
  app.use("/api/auth", UserRoute);
  app.use("/api/products", ProductRoute);

  //Protected Route
  app.use("/api/orders", isAuth, OrderRouter);
}
