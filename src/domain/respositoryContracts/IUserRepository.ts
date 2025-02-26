import { userDtoRequest } from "../../application/dtos/userDtoRequest";
import { userDtoResponse } from "../../application/dtos/userDtoResponse";
import { IUser } from "../entities/IUser";

export interface IUserReader {
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  getAll(): Promise<IUser[] | null>;
}

export interface IUserWriter {
  create(user: userDtoRequest): Promise<userDtoResponse>;
  edit(user: IUser): Promise<IUser>;
  delete(id: string): Promise<void>;
}

export interface IUserRepository extends IUserReader, IUserWriter {}
