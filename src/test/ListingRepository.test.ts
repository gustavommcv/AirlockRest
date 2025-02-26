import { IListing } from "../domain/entities/IListing";
import ListingRepository from "../infrastructure/repositories/ListingRepository";
import Listing from "../infrastructure/database/models/Listing";
import listingDtoResponse from "../application/dtos/listingDtoResponse";

let listingRepository: ListingRepository;
jest.mock("../infrastructure/database/models/Listing");

beforeEach(() => {
  listingRepository = new ListingRepository();
});

describe("Listing Repository", () => {
  describe("Queries", () => {
    describe("Get Listing by id", () => {
      it("Should return a listingDtoResponse that matches with the providade Id", async () => {
        const id = "1234";

        const sequelizeResponse = {
          id: "1234",
          title: "Casa na Praia",
          description: "Uma bela casa na praia com vista para o mar.",
          costPerNight: 250.75,
          locationType: "Praia",
          numOfBeds: 3,
          photoThumbnail: "https://example.com/photo.jpg",
          isFeatured: true,
          latitude: -23.55052,
          longitude: -46.633308,
          closedForBookings: false,
          hostId: "12345",
          createdAt: new Date(),
        } as IListing;

        (Listing.findByPk as jest.Mock).mockResolvedValue(sequelizeResponse);

        const repositoryResponse = await listingRepository.findById(id);

        const expectedResponse = new listingDtoResponse(
          sequelizeResponse.id,
          sequelizeResponse.title,
          sequelizeResponse.description || null,
          sequelizeResponse.costPerNight,
          sequelizeResponse.locationType,
          sequelizeResponse.numOfBeds,
          sequelizeResponse.photoThumbnail || null,
          sequelizeResponse.isFeatured || false,
          sequelizeResponse.latitude || null,
          sequelizeResponse.longitude || null,
          sequelizeResponse.closedForBookings || false,
          {
            id: sequelizeResponse.hostId,
            username: "username",
            email: "email@example.com",
          },
          sequelizeResponse.createdAt
        );

        expect(repositoryResponse).toEqual(expectedResponse);
        expect(Listing.findByPk).toHaveBeenCalledWith(id);
      });
    });

    describe("Get All Listings", () => {
      it("Should return an array of listingDtoResponse type", async () => {
        const l1 = {
          id: "1234",
          title: "Casa na Praia",
          description: "Uma bela casa na praia com vista para o mar.",
          costPerNight: 250.75,
          locationType: "Praia",
          numOfBeds: 3,
          photoThumbnail: "https://example.com/photo.jpg",
          isFeatured: true,
          latitude: -23.55052,
          longitude: -46.633308,
          closedForBookings: false,
          hostId: "12345",
          createdAt: new Date(),
        } as IListing;

        const l2 = {
          id: "abcd",
          title: "Loft Moderno no Centro",
          description:
            "Um loft espaçoso e moderno, perfeito para quem busca conforto e estilo.",
          costPerNight: 189.99,
          locationType: "Urbano",
          numOfBeds: 2,
          photoThumbnail: "https://example.com/modern-loft.jpg",
          isFeatured: false,
          latitude: -22.9035,
          longitude: -43.2096,
          closedForBookings: true,
          hostId: "xyz",
          createdAt: new Date(),
        } as IListing;

        const sequelizeResponse = [l1, l2];

        (Listing.findAll as jest.Mock).mockResolvedValue(sequelizeResponse);

        const repositoryResponse = await listingRepository.getAll();

        const expectedResponse = sequelizeResponse.map(
          (listing) =>
            new listingDtoResponse(
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
                id: listing.hostId,
                username: "username",
                email: "email@example.com",
              },
              listing.createdAt
            )
        );

        expect(repositoryResponse).toEqual(expectedResponse);
        expect(Listing.findAll).toHaveBeenCalled();
      });
    });
  });
});
