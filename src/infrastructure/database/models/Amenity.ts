import { DataTypes } from "sequelize";
import sequelize from "../connection";
import { IAmenity } from "../../../domain/entities/IAmenity";

const Amenity = sequelize.define<IAmenity>(
  "Amenity",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    category: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    tableName: "Amenity",
    timestamps: false,
  }
);

export default Amenity;
