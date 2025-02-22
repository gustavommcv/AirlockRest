import { Router } from "express";
import { authController } from "../controllers/authController";
import { UserService } from "../../../application/services/UserService";
import { body } from "express-validator";
import validationErrors from "../middlewares/validationsErrors";

const authRouter = Router();
const authControllerInstance = new authController(new UserService());

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
