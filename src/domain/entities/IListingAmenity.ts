import { Model } from "sequelize";

export interface IListingAmenity extends Model {
  listingId: string; // UUID da Listing
  amenityId: string; // UUID da Amenity
  createdAt: Date;
  updatedAt: Date;
}
