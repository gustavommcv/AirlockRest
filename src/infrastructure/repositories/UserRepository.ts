import { ModelStatic } from "sequelize";
import { IUser } from "../../domain/entities/IUser";
import { IUserRepository } from "../../domain/respositoryContracts/IUserRepository";
import User from "../database/models/User";

export default class UserRepository implements IUserRepository {
  private userModel: ModelStatic<IUser>;

  constructor(userModel: ModelStatic<IUser> = User) {
    this.userModel = userModel;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({
      where: {
        email: email,
      },
    });

    return user;
  }

  async findbyId(id: string): Promise<IUser | null> {
    const user = await this.userModel.findByPk(id);

    return user;
  }

  async getAll(): Promise<IUser[] | null> {
    const users = await this.userModel.findAll();

    return users;
  }

  async create(user: IUser): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async edit(user: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
