import { userDtoRequest } from "../../application/dtos/userDtoRequest";
import { userDtoResponse } from "../../application/dtos/userDtoResponse";
import { IUser } from "../entities/IUser";

export interface IUserRepository {
  // Find a user by Id
  findbyId(id: string): Promise<IUser | null>;

  // Find a user by email
  findByEmail(email: string): Promise<IUser | null>;

  // Get all users
  getAll(): Promise<IUser[] | null>;

  // Create a user
  create(user: userDtoRequest): Promise<userDtoResponse>;

  // Edit a user
  edit(user: IUser): Promise<IUser>;

  // Delete a user
  delete(id: string): Promise<void>;
}
