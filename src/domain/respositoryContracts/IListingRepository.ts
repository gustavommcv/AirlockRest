import { listingDtoRequest } from "../../application/dtos/listingDtoRequest";
import listingDtoResponse from "../../application/dtos/listingDtoResponse";

export interface IListingReader {
  findById(id: string): Promise<listingDtoResponse | null>;
  getAll(): Promise<listingDtoResponse[]>;
}

export interface IListingWriter {
  create(listing: listingDtoRequest): Promise<listingDtoResponse>;
  edit(id: string, updatedData: Partial<listingDtoRequest>): Promise<listingDtoResponse>;
  delete(id: string): Promise<void>;
}

export default interface IListingRepository
  extends IListingReader,
    IListingWriter {}
