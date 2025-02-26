import listingDtoResponse from "../../application/dtos/listingDtoResponse";

export interface IListingReader {
  findById(id: string): Promise<listingDtoResponse | null>;
  getAll(): Promise<listingDtoResponse[]>;
}

export interface IListingWriter {
  create(): Promise<listingDtoResponse>;
  edit(): Promise<listingDtoResponse>;
  delete(id: string): Promise<void>;
}

export default interface IListingRepository
  extends IListingReader,
    IListingWriter {}
