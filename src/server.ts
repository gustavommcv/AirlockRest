import express, { json, Request, Response } from "express";
import cookieParser from "cookie-parser";
import indexRouter from "./infrastructure/http/routes/indexRouter";
import { initializeDatabase } from "./infrastructure/database/connection";

// Create a new express application instance
const app = express();

app.use(json());
app.use(cookieParser());

initializeDatabase();

// Define the root path with a greeting message
app.get("/", (request: Request, response: Response) => {
  response.json({
    message: "Welcome to the Airlock API!",
    endpoint: "/api - Use this endpoint to see all endpoints",
  });
});

app.use("/api", indexRouter);

export default app;
