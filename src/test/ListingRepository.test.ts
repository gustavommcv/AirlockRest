import { IListing } from "../domain/entities/IListing";
import ListingRepository from "../infrastructure/repositories/ListingRepository";
import Listing from "../infrastructure/database/models/Listing";
import listingDtoResponse from "../application/dtos/listingDtoResponse";
import { listingDtoRequest } from "../application/dtos/listingDtoRequest";

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

  describe("Mutations", () => {
    describe("Create a new Listing", () => {
      it("Should create a new listing and return the created listing dto response", async () => {
        const newListingRequest = new listingDtoRequest(
          "Casa na Praia",
          "Uma bela casa com vista para o mar.",
          150.0,
          "praia",
          2,
          "https://example.com/thumbnail.jpg",
          false,
          -23.5505,
          -46.6333,
          false,
          "12345"
        );

        const sequelizeResponse = {
          id: "67890",
          title: newListingRequest.title,
          description: newListingRequest.description,
          costPerNight: newListingRequest.costPerNight,
          locationType: newListingRequest.locationType,
          numOfBeds: newListingRequest.numOfBeds,
          photoThumbnail: newListingRequest.photoThumbnail,
          isFeatured: newListingRequest.isFeatured,
          latitude: newListingRequest.latitude,
          longitude: newListingRequest.longitude,
          closedForBookings: newListingRequest.closedForBookings,
          hostId: newListingRequest.hostId,
          createdAt: new Date(),
        } as IListing;

        (Listing.create as jest.Mock).mockResolvedValue(sequelizeResponse);

        const mockHost = {
          id: "12345",
          username: "host_user",
          email: "host@example.com",
        };

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
          mockHost,
          sequelizeResponse.createdAt
        );

        const listingRepositoryResponse = await listingRepository.create(
          newListingRequest
        );

        expect(listingRepositoryResponse).toEqual(expectedResponse);
      });
    });

    describe("Edit a Listing", () => {
      it("Should edit a listing and return the listing response with the modified values", async () => {
        const id = "1234";
        const updatedData = {
          title: "Casa na Praia Atualizada",
          description: "Uma casa ainda mais bonita com vista para o mar.",
          costPerNight: 300.0,
          closedForBookings: true,
        } as Partial<listingDtoRequest>;

        const sequelizeResponse = {
          id: "1234",
          title: updatedData.title,
          description: updatedData.description,
          costPerNight: updatedData.costPerNight,
          locationType: "Praia",
          numOfBeds: 3,
          photoThumbnail: "https://example.com/photo.jpg",
          isFeatured: true,
          latitude: -23.55052,
          longitude: -46.633308,
          closedForBookings: updatedData.closedForBookings,
          hostId: "12345",
          createdAt: new Date(),
        } as IListing;

        (Listing.update as jest.Mock).mockResolvedValue([1]);
        (Listing.findByPk as jest.Mock).mockResolvedValue(sequelizeResponse);

        const mockHost = {
          id: "12345",
          username: "host_user",
          email: "host@example.com",
        };

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
          mockHost,
          sequelizeResponse.createdAt
        );

        const repositoryResponse = await listingRepository.edit(
          id,
          updatedData
        );

        expect(repositoryResponse).toEqual(expectedResponse);
        expect(Listing.update).toHaveBeenCalledWith(updatedData, {
          where: { id },
        });
        expect(Listing.findByPk).toHaveBeenCalledWith(id);
      });
    });

    describe("Delete a Listing", () => {
      it("Should delete a listing with no errors", async () => {
        const id = "1234";

        (Listing.destroy as jest.Mock).mockResolvedValue(1);

        await listingRepository.delete(id);

        expect(Listing.destroy).toHaveBeenCalledWith({ where: { id } });
      });
    });
  });
});
