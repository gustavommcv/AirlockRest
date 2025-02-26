import { listingDtoRequest } from "../../application/dtos/listingDtoRequest";
import listingDtoResponse from "../../application/dtos/listingDtoResponse";

export interface IListingReaderService {
  getAll(): Promise<listingDtoResponse[] | null>;
}

export interface IListingWriterService {
  postListing(listing: listingDtoRequest): Promise<listingDtoResponse | null>;
}

export interface IListingService
  extends IListingWriterService,
    IListingReaderService {}
