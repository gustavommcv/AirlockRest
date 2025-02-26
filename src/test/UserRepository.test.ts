import { ModelStatic } from "sequelize";
import UserRepository from "../infrastructure/repositories/UserRepository";
import User from "../infrastructure/database/models/User";
import { IUser } from "../domain/entities/IUser";
import { userDtoRequest } from "../application/dtos/userDtoRequest";
import { userDtoResponse } from "../application/dtos/userDtoResponse";

jest.mock("../infrastructure/database/models/User");

describe("UserRepository", () => {
  let userRepository: UserRepository;
  let mockUserModel: jest.Mocked<ModelStatic<IUser>>;

  beforeEach(() => {
    mockUserModel = User as jest.Mocked<ModelStatic<IUser>>;
    userRepository = new UserRepository(mockUserModel);
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("Queries", () => {
    describe("findByEmail", () => {
      it("should return a user by email", async () => {
        const mockUser = {
          id: "1234",
          username: "John Doe",
          email: "john@example.com",
          password: "hashedpassword",
          role: "guest",
        } as IUser;

        mockUserModel.findOne.mockResolvedValue(mockUser);

        const result = await userRepository.findByEmail("john@example.com");

        expect(mockUserModel.findOne).toHaveBeenCalledWith({
          where: { email: "john@example.com" },
        });
        expect(result).toEqual(mockUser);
      });

      it("should return null if user is not found", async () => {
        mockUserModel.findOne.mockResolvedValue(null);

        const result = await userRepository.findByEmail("john@example.com");

        expect(result).toBeNull();
      });
    });

    describe("findById", () => {
      it("should return a user by id", async () => {
        const mockUser = {
          id: "1234",
          username: "John Doe",
          email: "john@example.com",
          password: "hashedpassword",
          role: "guest",
        } as IUser;

        mockUserModel.findByPk.mockResolvedValue(mockUser);

        const result = await userRepository.findById("1234");

        expect(mockUserModel.findByPk).toHaveBeenCalledWith("1234");
        expect(result).toEqual(mockUser);
      });

      it("should return null if user is not found", async () => {
        mockUserModel.findByPk.mockResolvedValue(null);

        const result = await userRepository.findById("1234");

        expect(result).toBeNull();
      });
    });

    describe("getAll", () => {
      it("should return all users", async () => {
        const mockUsers = [
          {
            id: "1234",
            username: "John Doe",
            email: "john@example.com",
            password: "hashedpassword",
            role: "guest",
          },
          {
            id: "5678",
            username: "Jane Doe",
            email: "jane@example.com",
            password: "hashedpassword",
            role: "admin",
          },
        ] as IUser[];

        mockUserModel.findAll.mockResolvedValue(mockUsers);

        const result = await userRepository.getAll();

        expect(mockUserModel.findAll).toHaveBeenCalled();
        expect(result).toEqual(mockUsers);
      });

      it("should return an empty array if no users are found", async () => {
        mockUserModel.findAll.mockResolvedValue([]);

        const result = await userRepository.getAll();

        expect(result).toEqual([]);
      });
    });
  });

  describe("Mutations", () => {
    describe("create", () => {
      it("should create a new user and return a userDtoResponse", async () => {
        const userDtoRequest: userDtoRequest = {
          username: "John Doe",
          email: "john@example.com",
          password: "123456",
          role: "guest",
        };

        const mockCreatedUser = {
          id: "1234",
          username: "John Doe",
          email: "john@example.com",
          password: "hashedpassword",
          role: "guest",
        } as IUser;

        const expectedUserDtoResponse = new userDtoResponse(
          mockCreatedUser.id,
          mockCreatedUser.username,
          mockCreatedUser.email,
          mockCreatedUser.role
        );

        mockUserModel.create.mockResolvedValue(mockCreatedUser);

        const result = await userRepository.create(userDtoRequest);

        expect(mockUserModel.create).toHaveBeenCalledWith(userDtoRequest);
        expect(result).toEqual(expectedUserDtoResponse);
      });

      it("should throw an error if user creation fails", async () => {
        const userDtoRequest: userDtoRequest = {
          username: "John Doe",
          email: "john@example.com",
          password: "123456",
          role: "guest",
        };

        mockUserModel.create.mockRejectedValue(new Error("Creation failed"));

        await expect(userRepository.create(userDtoRequest)).rejects.toThrow(
          "Creation failed"
        );
      });
    });

    describe("edit", () => {
      it("should update a user and return a userDtoResponse", async () => {
        const userId = "1234";
        const updatedData: Partial<userDtoRequest> = {
          username: "John Updated",
          email: "john.updated@example.com",
        };

        const mockUpdatedUser = {
          id: userId,
          username: updatedData.username,
          email: updatedData.email,
          password: "hashedpassword",
          role: "guest",
        } as IUser;

        const expectedUserDtoResponse = new userDtoResponse(
          mockUpdatedUser.id,
          mockUpdatedUser.username,
          mockUpdatedUser.email,
          mockUpdatedUser.role
        );

        mockUserModel.update.mockResolvedValue([1]);
        mockUserModel.findByPk.mockResolvedValue(mockUpdatedUser);

        const result = await userRepository.edit(userId, updatedData);

        expect(mockUserModel.update).toHaveBeenCalledWith(updatedData, {
          where: { id: userId },
        });
        expect(mockUserModel.findByPk).toHaveBeenCalledWith(userId);
        expect(result).toEqual(expectedUserDtoResponse);
      });
    });

    // TODO
    describe("delete", () => {
      it("should delete a user", async () => {
        const userId = "1234";

        mockUserModel.destroy.mockResolvedValue(1);

        await userRepository.delete(userId);

        expect(mockUserModel.destroy).toHaveBeenCalledWith({
          where: { id: userId },
        });
      });
    });
  });
});
