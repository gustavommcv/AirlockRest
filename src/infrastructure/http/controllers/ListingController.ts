import { Request, Response } from "express";
import { CustomError } from "../../../shared/errors/CustomError";
import { inject, injectable } from "tsyringe";
import { IListingService } from "../../../domain/serviceContracts/IListingService";
import { matchedData } from "express-validator";
import { listingDtoRequest } from "../../../application/dtos/listingDtoRequest";

@injectable()
export default class ListingController {
  constructor(
    @inject("IListingService") private listingService: IListingService
  ) {}

  public async getListings(request: Request, response: Response) {
    try {
      const listings = await this.listingService.getAll();

      response.json(listings);
    } catch (error) {
      if (error instanceof CustomError) {
        response.status(error.status).json({ message: error.message });
        return;
      } else if (error instanceof Error) {
        response.status(500).json({ message: error.message });
        return;
      } else {
        response.status(500).json({ message: String(error) });
        return;
      }
    }
  }

  public async postListing(request: Request, response: Response) {
    const listing = matchedData(request);

    if (!request.user?.id) {
      response.status(401).json({ message: "Unauthorized" });
      return;
    }

    const listingRequest = new listingDtoRequest(
      listing.title,
      listing.description,
      listing.costPerNight,
      listing.locationType,
      listing.numOfBeds,
      listing.photoThumbnail,
      listing.isFeatured,
      listing.latitude,
      listing.longitude,
      listing.closedForBookings,
      request.user?.id,
      listing.amenities
    );

    response.json({
      message: "At post listing!",
      user: request.user,
      listingRequest: listingRequest,
    });
  }
}
