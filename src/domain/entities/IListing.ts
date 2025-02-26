import { Model } from "sequelize";
import { IUser } from "./IUser";
import { IAmenity } from "./IAmenity";

export interface IListing extends Model {
  id: string; // UUID
  title: string; // VARCHAR(50)
  description?: string | null; // VARCHAR(500), optional
  costPerNight: number; // DECIMAL(10, 2)
  locationType: string; // VARCHAR(30)
  numOfBeds: number; // INTEGER
  photoThumbnail?: string | null; // VARCHAR(150), optional
  isFeatured?: boolean; // BOOLEAN DEFAULT FALSE
  latitude?: number | null; // DECIMAL(9, 6), optional
  longitude?: number | null; // DECIMAL(9, 6), optional
  closedForBookings?: boolean; // BOOLEAN DEFAULT FALSE
  hostId: string; // CHAR(36), UUID
  createdAt: Date;

  // Include the associations
  user?: IUser; // Association with User
  amenities?: IAmenity[]; // Association with Amenity
}
