import { Router } from "express";
import { body } from "express-validator";
import validationErrors from "../middlewares/validationsErrors";
import { container } from "tsyringe";
import AuthController from "../controllers/AuthController";

const authRouter = Router();
const authControllerInstance =
  container.resolve<AuthController>("AuthController");

authRouter.post(
  "/login",
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid format for email"),
  body("password")
    .isLength({ min: 3, max: 100 })
    .withMessage("Password must be between 3 and 100"),
  validationErrors,
  authControllerInstance.login.bind(authControllerInstance)
);

authRouter.get(
  "/logout",
  authControllerInstance.logout.bind(authControllerInstance)
);

authRouter.post(
  "/signup",
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid format for email"),
  body("password")
    .isLength({ min: 3, max: 100 })
    .withMessage("Password must be between 3 and 100"),
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50"),
  body("role")
    .notEmpty()
    .withMessage("Role cannot be empty")
    .isIn(["host", "guest"])
    .withMessage("Role must be either 'host' or 'guest'"),
  validationErrors,
  authControllerInstance.signup.bind(authControllerInstance)
);

export default authRouter;
