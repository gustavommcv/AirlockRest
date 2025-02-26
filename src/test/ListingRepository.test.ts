import "reflect-metadata";
import { IListing } from "../domain/entities/IListing";
import ListingRepository from "../infrastructure/repositories/ListingRepository";
import listingDtoResponse from "../application/dtos/listingDtoResponse";
import { listingDtoRequest } from "../application/dtos/listingDtoRequest";
import { Model, ModelStatic } from "sequelize";
import { IUser } from "../domain/entities/IUser";

let listingRepository: ListingRepository;

interface MockModelStatic<M extends Model> extends ModelStatic<M> {
  findByPk: jest.Mock;
  findAll: jest.Mock;
  create: jest.Mock;
  update: jest.Mock;
  destroy: jest.Mock;
}

const mockListingModel: MockModelStatic<IListing> = {
  findByPk: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  prototype: {} as IListing,
  tableName: "Listings",
  primaryKeyAttribute: "id",
  primaryKeyAttributes: ["id"],
} as unknown as MockModelStatic<IListing>;

const mockUserModel: MockModelStatic<IUser> = {
  findByPk: jest.fn(),
  prototype: {} as IUser,
  tableName: "Users",
  primaryKeyAttribute: "id",
  primaryKeyAttributes: ["id"],
} as unknown as MockModelStatic<IUser>;

beforeEach(() => {
  listingRepository = new ListingRepository(mockListingModel, mockUserModel);
  jest.clearAllMocks();
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

        const mockHost = {
          id: "12345",
          username: "host_user",
          email: "host@example.com",
        };

        mockListingModel.findByPk.mockResolvedValue(sequelizeResponse);
        mockUserModel.findByPk.mockResolvedValue(mockHost);

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
        expect(mockListingModel.findByPk).toHaveBeenCalledWith(id);
        expect(mockUserModel.findByPk).toHaveBeenCalledWith(
          sequelizeResponse.hostId
        );
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

        const mockHost1 = {
          id: "12345",
          username: "host_user",
          email: "host@example.com",
        };

        const mockHost2 = {
          id: "xyz",
          username: "another_host",
          email: "another@example.com",
        };

        mockListingModel.findAll.mockResolvedValue(sequelizeResponse);
        mockUserModel.findByPk.mockImplementation((id) => {
          if (id === "12345") return Promise.resolve(mockHost1);
          if (id === "xyz") return Promise.resolve(mockHost2);
          return Promise.resolve(null);
        });

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
              listing.hostId === "12345" ? mockHost1 : mockHost2,
              listing.createdAt
            )
        );

        expect(repositoryResponse).toEqual(expectedResponse);
        expect(mockListingModel.findAll).toHaveBeenCalled();
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

        const mockHost = {
          id: "12345",
          username: "host_user",
          email: "host@example.com",
        };

        mockListingModel.create.mockResolvedValue(sequelizeResponse);
        mockUserModel.findByPk.mockResolvedValue(mockHost);

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
        expect(mockListingModel.create).toHaveBeenCalledWith(newListingRequest);
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

        const mockHost = {
          id: "12345",
          username: "host_user",
          email: "host@example.com",
        };

        mockListingModel.update.mockResolvedValue([1]);
        mockListingModel.findByPk.mockResolvedValue(sequelizeResponse);
        mockUserModel.findByPk.mockResolvedValue(mockHost);

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
        expect(mockListingModel.update).toHaveBeenCalledWith(updatedData, {
          where: { id },
        });
        expect(mockListingModel.findByPk).toHaveBeenCalledWith(id);
      });
    });

    describe("Delete a Listing", () => {
      it("Should delete a listing with no errors", async () => {
        const id = "1234";

        mockListingModel.destroy.mockResolvedValue(1);

        await listingRepository.delete(id);

        expect(mockListingModel.destroy).toHaveBeenCalledWith({
          where: { id },
        });
      });
    });
  });
});
