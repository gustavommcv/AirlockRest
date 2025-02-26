import { inject, injectable } from "tsyringe";
import { listingDtoRequest } from "../../application/dtos/listingDtoRequest";
import listingDtoResponse from "../../application/dtos/listingDtoResponse";
import IListingRepository from "../../domain/respositoryContracts/IListingRepository";
import { ModelStatic } from "sequelize";
import { IListing } from "../../domain/entities/IListing";
import { IUser } from "../../domain/entities/IUser";

@injectable()
export default class ListingRepository implements IListingRepository {
  constructor(
    @inject("ListingModel") private listingModel: ModelStatic<IListing>,
    @inject("UserModel") private userModel: ModelStatic<IUser>
  ) {}

  findById(id: string): Promise<listingDtoResponse | null> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<listingDtoResponse[]> {
    const listings = await this.listingModel.findAll();

    const listingPromises = listings.map(async (listing) => {
      const host = await this.userModel.findByPk(listing.hostId);

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
        listing.createdAt
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
