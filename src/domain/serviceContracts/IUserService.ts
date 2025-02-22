import { userDtoRequest } from "../../application/dtos/userDtoRequest";
import { userDtoResponse } from "../../application/dtos/userDtoResponse";

export interface IUserService {
  // Find a user by id
  findById(id: string): Promise<userDtoResponse | null>;

  // Get all users
  getAll(): Promise<userDtoResponse[] | null>;

  // Register a user
  register(user: userDtoRequest): Promise<userDtoResponse>;

  // Login
  login(email: string, password: string): Promise<userDtoResponse>;
}
