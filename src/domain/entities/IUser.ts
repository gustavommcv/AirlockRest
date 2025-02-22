import { Model } from "sequelize";

export interface IUser extends Model {
  id?: string;
  username: string;
  email: string;
  password: string;
  role: string;
}
