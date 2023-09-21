import type { Application } from "express";

// Import All Routes
import UserRoute from "./user.routes";

// Middlewares
import { isAuth } from "../middlewares/IsAuth";

export default function InjectRoutes(app: Application) {
  app.use("/api/auth", UserRoute);
}
