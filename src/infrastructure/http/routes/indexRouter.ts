import "../../database/models/associations";
import { Router, Request, Response } from "express";
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import listingRouter from "./listingRouter";

const indexRouter = Router();

indexRouter.get("/", (request: Request, response: Response) => {
  response.json({
    message: "Here is a list of all the endpoints you can reach:",
    endpoints: "To Do",
  });
});

indexRouter.use("/users", userRouter);
indexRouter.use("/auth", authRouter);
indexRouter.use("/listings", listingRouter);

export default indexRouter;
