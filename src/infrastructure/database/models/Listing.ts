import { DataTypes } from "sequelize";
import { IListing } from "../../../domain/entities/IListing";
import sequelize from "../connection";

const Listing = sequelize.define<IListing>(
  "Listing",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    costPerNight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    locationType: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    numOfBeds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    photoThumbnail: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: true,
    },
    closedForBookings: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    hostId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    tableName: "Listing",
    timestamps: true,
  }
);

export default Listing;
