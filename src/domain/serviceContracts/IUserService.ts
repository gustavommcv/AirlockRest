import { userDtoRequest } from "../../application/dtos/userDtoRequest";
import { userDtoResponse } from "../../application/dtos/userDtoResponse";

export interface IUserReaderService {
  findById(id: string): Promise<userDtoResponse | null>;
  getAll(): Promise<userDtoResponse[] | null>;
}

export interface IUserAuthService {
  login(email: string, password: string): Promise<userDtoResponse>;
}

export interface IUserWriterService {
  register(user: userDtoRequest): Promise<userDtoResponse>;
}

export interface IUserService
  extends IUserReaderService,
    IUserAuthService,
    IUserWriterService {}
