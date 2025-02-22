import { matchedData } from "express-validator";
import { IUserService } from "../../../domain/serviceContracts/IUserService";
import { Request, Response } from "express";
import generateToken from "../../utils/generateToken";
import { CustomError } from "../../../shared/errors/CustomError";
import { userDtoRequest } from "../../../application/dtos/userDtoRequest";

export class authController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  public async login(request: Request, response: Response) {
    const { email, password } = matchedData(request);
    const cookies = request.cookies;

    if (cookies.jwtToken) {
      response.status(400).json({ message: "Already logged in" });
      return;
    }

    try {
      const foundUser = await this.userService.login(email, password);

      const token = generateToken(foundUser);

      response.cookie("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600000, // 1 hour
      });

      response.json({
        message: "Login was successful",
        loggedIn: foundUser,
      });
      return;
    } catch (error) {
      if (error instanceof CustomError) {
        response.status(error.status).json({ message: error.message });
        return;
      } else if (error instanceof Error) {
        response.status(500).json({ message: error.message });
        return;
      } else {
        response.status(500).json({ message: String(error) });
        return;
      }
    }
  }

  public async logout(request: Request, response: Response) {
    const cookies = request.cookies;

    if (!cookies.jwtToken) {
      response.status(400).json({ message: "There is no user logged in" });
      return;
    }

    response.clearCookie("jwtToken");

    response.json({ message: "Logout was successful" });
  }

  public async signup(request: Request, response: Response) {
    const cookies = request.cookies;

    if (cookies.jwtToken) {
      response.status(400).json({ message: "Cannot signup while logged in" });
      return;
    }

    const { username, email, password, role } = matchedData(request);

    try {
      const userResponse = this.userService.register(
        new userDtoRequest(password, username, email, role)
      );

      response.json({ message: "User has been created", user: userResponse });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
        return;
      } else {
        response.status(500).json({ message: String(error) });
        return;
      }
    }
  }
}
