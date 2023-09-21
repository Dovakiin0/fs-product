import express, { Express } from "express";
import InjectRoutes from "./routes/router";
import cors from "cors";
import { errorHandler } from "./middlewares/ErrorMiddleware";

const app: Express = express();

// middlewares for the application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add all routes for the application
InjectRoutes(app);
// add Custom Error Handler middleware
app.use(errorHandler);

export default app;
