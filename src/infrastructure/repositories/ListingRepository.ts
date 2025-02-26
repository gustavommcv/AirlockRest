import { listingDtoRequest } from "../../application/dtos/listingDtoRequest";
import listingDtoResponse from "../../application/dtos/listingDtoResponse";
import IListingRepository from "../../domain/respositoryContracts/IListingRepository";

export default class ListingRepository implements IListingRepository {
  findById(id: string): Promise<listingDtoResponse | null> {
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<listingDtoResponse[]> {
    throw new Error("Method not implemented.");
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
