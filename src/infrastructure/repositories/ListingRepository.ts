import { inject, injectable } from "tsyringe";
import { listingDtoRequest } from "../../application/dtos/listingDtoRequest";
import listingDtoResponse from "../../application/dtos/listingDtoResponse";
import IListingRepository from "../../domain/respositoryContracts/IListingRepository";
import { ModelStatic } from "sequelize";
import { IListing } from "../../domain/entities/IListing";
import { IUser } from "../../domain/entities/IUser";
import Amenity from "../database/models/Amenity";
import { IAmenity } from "../../domain/entities/IAmenity";
import { IListingAmenity } from "../../domain/entities/IListingAmenity";

@injectable()
export default class ListingRepository implements IListingRepository {
  constructor(
    @inject("ListingModel") private listingModel: ModelStatic<IListing>,
    @inject("UserModel") private userModel: ModelStatic<IUser>,
    @inject("AmenityModel") private amenityModel: ModelStatic<IAmenity>,
    @inject("ListingAmenityModel")
    private listingAmenityModel: ModelStatic<IListingAmenity>
  ) {}

  async findById(id: string): Promise<listingDtoResponse | null> {
    const listing = await this.listingModel.findByPk(id, {
      include: [
        {
          model: this.userModel,
          as: "user",
          attributes: ["id", "username", "email"],
        },
        {
          model: Amenity,
          as: "amenities",
          attributes: ["id", "name", "category"],
          through: { attributes: [] },
        },
      ],
    });

    if (!listing) {
      return null;
    }

    const host = listing.user;

    return new listingDtoResponse(
      listing.id,
      listing.title,
      listing.description || null,
      listing.costPerNight,
      listing.locationType,
      listing.numOfBeds,
      listing.photoThumbnail || null,
      listing.isFeatured || false,
      listing.latitude || null,
      listing.longitude || null,
      listing.closedForBookings || false,
      {
        id: host?.id || "Unknown",
        username: host?.username || "Unknown",
        email: host?.email || "Unknown",
      },
      listing.createdAt
    );
  }

  async getAll(): Promise<listingDtoResponse[]> {
    const listings = await this.listingModel.findAll({
      include: [
        {
          model: this.userModel,
          as: "user",
          attributes: ["id", "username", "email"],
        },
        {
          model: Amenity,
          as: "amenities",
          attributes: ["id", "name", "category"],
          through: { attributes: [] },
        },
      ],
    });

    const listingPromises = listings.map(async (listing: IListing) => {
      const host = listing.user;
      const amenities = listing.amenities || [];

      return new listingDtoResponse(
        listing.id,
        listing.title,
        listing.description || null,
        listing.costPerNight,
        listing.locationType || "Unknown",
        listing.numOfBeds,
        listing.photoThumbnail || null,
        listing.isFeatured || false,
        listing.latitude || null,
        listing.longitude || null,
        listing.closedForBookings || false,
        {
          id: host?.id || "Unknown",
          username: host?.username || "Unknown",
          email: host?.email || "Unknown",
        },
        listing.createdAt,
        amenities.map((amenity) => ({
          id: amenity.id,
          name: amenity.name,
          category: amenity.category,
        }))
      );
    });

    const listingResponse = await Promise.all(listingPromises);
    return listingResponse;
  }

  create(listing: listingDtoRequest): Promise<listingDtoResponse> {
    throw new Error("Method not implemented.");
  }

  edit(
    id: string,
    updatedData: Partial<listingDtoRequest>
  ): Promise<listingDtoResponse> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
