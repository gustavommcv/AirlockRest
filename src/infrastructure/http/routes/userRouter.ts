import { Router } from "express";
import { param } from "express-validator";
import { userController } from "../controllers/userController";
import validationErrors from "../middlewares/validationsErrors";
import { UserService } from "../../../application/services/UserService";

const userRouter = Router();
const userControllerInstance = new userController(new UserService());

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
