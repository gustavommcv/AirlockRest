import { DataTypes } from "sequelize";
import sequelize from "../connection";
import { IListingAmenity } from "../../../domain/entities/IListingAmenity";

const ListingAmenity = sequelize.define<IListingAmenity>(
  "ListingAmenity",
  {
    listingId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    amenityId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  },
  {
    tableName: "Listing_Amenity",
    timestamps: false,
  }
);

export default ListingAmenity;
