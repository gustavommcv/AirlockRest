import listingDtoResponse from "../../application/dtos/listingDtoResponse";
import IListingRepository from "../../domain/respositoryContracts/IListingRepository";

export default class ListingRepository implements IListingRepository {
  findById(id: string): Promise<listingDtoResponse | null> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<listingDtoResponse[]> {
    throw new Error("Method not implemented.");
  }
  create(): Promise<listingDtoResponse> {
    throw new Error("Method not implemented.");
  }
  edit(): Promise<listingDtoResponse> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
