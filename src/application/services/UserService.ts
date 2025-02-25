import bcrypt from "bcrypt";

import { IUserRepository } from "../../domain/respositoryContracts/IUserRepository";
import { IUserService } from "../../domain/serviceContracts/IUserService";
import UserRepository from "../../infrastructure/repositories/UserRepository";
import { userDtoRequest } from "../dtos/userDtoRequest";
import { userDtoResponse } from "../dtos/userDtoResponse";
import { CustomError } from "../../shared/errors/CustomError";
import hashPassword from "../../infrastructure/utils/hashPassword";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  async login(email: string, password: string): Promise<userDtoResponse> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (!existingUser) {
      throw new CustomError("User does not exist", 404);
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      throw new CustomError("Password does not match", 401);
    }

    const userResponse = new userDtoResponse(
      existingUser.id,
      existingUser.username,
      existingUser.email,
      existingUser.role
    );

    return userResponse;
  }

  async register(user: userDtoRequest): Promise<userDtoResponse> {
    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser) {
      throw new CustomError("User already signed up", 409);
    }

    user.password = await hashPassword(user.password);

    const createdUser = await this.userRepository.create(user);

    return createdUser;
  }

  async findById(id: string): Promise<userDtoResponse | null> {
    const user = await this.userRepository.findById(id);

    if (!user) return null;

    const userResponse = new userDtoResponse(
      user.id,
      user.username,
      user.email,
      user.role
    );

    return userResponse;
  }

  async getAll(): Promise<userDtoResponse[] | null> {
    const users = await this.userRepository.getAll();

    if (!users) return null;

    const usersResponse = users.map(
      (user) =>
        new userDtoResponse(user.id, user.username, user.email, user.role)
    );

    return usersResponse;
  }
}
