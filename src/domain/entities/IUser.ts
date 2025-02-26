import { Model } from "sequelize";

export interface IUser extends Model {
  id?: string; // UUID
  username: string; // VARCHAR(50)
  email: string; // VARCHAR(100)
  password: string; // VARCHAR(255)
  role: string; // ENUM('host', 'guest')
}
