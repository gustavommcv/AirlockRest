import { Request, Response } from "express";
import { IUserService } from "../../../domain/serviceContracts/IUserService";
import { matchedData } from "express-validator";

export class userController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  public async getUsers(request: Request, response: Response) {
    try {
      const users = await this.userService.getAll();
      response.json(users);
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

  public async getUser(request: Request, response: Response) {
    const { userId } = matchedData(request);
    const user = await this.userService.findById(userId);

    if (!user) {
      response.status(404).json({ message: "User not found" });
      return;
    }

    response.json(user);
  }
}
