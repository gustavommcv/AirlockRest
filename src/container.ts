import { container } from "tsyringe";
import { ModelStatic } from "sequelize";
import User from "./infrastructure/database/models/User";
import { IUser } from "./domain/entities/IUser";
import { IUserRepository } from "./domain/respositoryContracts/IUserRepository";
import { UserService } from "./application/services/UserService";
import { IUserService } from "./domain/serviceContracts/IUserService";
import UserRepository from "./infrastructure/repositories/UserRepository";
import AuthController from "./infrastructure/http/controllers/AuthController";
import UserController from "./infrastructure/http/controllers/UserController";

container.register("AuthController", { useClass: AuthController });
container.register("UserController", { useClass: UserController });

container.register<ModelStatic<IUser>>("UserModel", { useValue: User });
container.register<IUserRepository>("IUserRepository", {
  useClass: UserRepository,
});
container.register<IUserService>("IUserService", { useClass: UserService });
