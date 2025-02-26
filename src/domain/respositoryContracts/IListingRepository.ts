import listingDtoResponse from "../../application/dtos/listingDtoResponse";

export default interface IListingRepository {
  // Find a listing by id
  findById(id: string): Promise<listingDtoResponse | null>;

  // Get all listings
  getAll(): Promise<listingDtoResponse[]>;

  // Create a listing
  create(): Promise<listingDtoResponse>;

  // Edit a listing
  edit(): Promise<listingDtoResponse>;

  // Delete a listing
  delete(id: string): Promise<void>;
}
