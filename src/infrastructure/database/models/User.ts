import { DataTypes } from "sequelize";
import sequelize from "../connection";
import { IUser } from "../../../domain/entities/IUser";

const User = sequelize.define<IUser>(
  "User", // Ensure the table name matches the database schema
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50), // VARCHAR(50)
      allowNull: false,
      unique: true, // Username must be unique
    },
    email: {
      type: DataTypes.STRING(100), // VARCHAR(100)
      allowNull: false,
      unique: true, // Email must be unique
    },
    password: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING, // ENUM('host', 'guest')
      allowNull: false,
    },
  },
  {
    tableName: "User", // Ensure the table name matches the database schema
    timestamps: true, // createdAt and updatedAt are automatically handled
  }
);

export default User;
