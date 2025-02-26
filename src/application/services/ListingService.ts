import { inject, injectable } from "tsyringe";
import { IListingService } from "../../domain/serviceContracts/IListingService";
import listingDtoResponse from "../dtos/listingDtoResponse";
import IListingRepository from "../../domain/respositoryContracts/IListingRepository";
import { listingDtoRequest } from "../dtos/listingDtoRequest";

@injectable()
export default class ListingService implements IListingService {
  constructor(
    @inject("IListingRepository") private listingRepository: IListingRepository
  ) {}

  async getAll(): Promise<listingDtoResponse[] | null> {
    const listings = await this.listingRepository.getAll();

    if (!listings) return null;

    return listings;
  }

  async postListing(listing: listingDtoRequest): Promise<listingDtoResponse | null> {
    const listingResponse = await this.listingRepository.create(listing);

    return listingResponse;
  }

  async findById(id: string): Promise<listingDtoResponse | null> {
    const listing = await this.listingRepository.findById(id);

    if (!listing) return null;

    return listing;
  }
}
