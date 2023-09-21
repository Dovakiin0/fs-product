import express, { Express } from "express";
import InjectRoutes from "./routes/router";
import cors from "cors";
import { errorHandler } from "./middlewares/ErrorMiddleware";
import morgan from "morgan";

const app: Express = express();

// middlewares for the application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms"),
);

// add all routes for the application
InjectRoutes(app);
// add Custom Error Handler middleware
app.use(errorHandler);

export default app;
