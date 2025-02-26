import { Router } from "express";
import { param } from "express-validator";
import validationErrors from "../middlewares/validationsErrors";
import { container } from "tsyringe";
import UserController from "../controllers/UserController";

const userRouter = Router();
const userControllerInstance =
  container.resolve<UserController>("UserController");

userRouter.get(
  "/:userId",
  param("userId")
    .notEmpty()
    .withMessage("User ID cannot be empty")
    .isUUID()
    .withMessage("User id must be an UUID"),
  validationErrors,
  userControllerInstance.getUser.bind(userControllerInstance)
);

userRouter.get(
  "/",
  userControllerInstance.getUsers.bind(userControllerInstance)
);

export default userRouter;
