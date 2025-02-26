import { Model } from "sequelize";

export interface IAmenity extends Model {
  id: string; // UUID
  category: string; // VARCHAR(30)
  name: string; // VARCHAR(30)
}

