import { UserService } from "../application/services/UserService";
import UserRepository from "../infrastructure/repositories/UserRepository";
import { userDtoRequest } from "../application/dtos/userDtoRequest";
import { userDtoResponse } from "../application/dtos/userDtoResponse";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../domain/entities/IUser";
import bcrypt from "bcrypt";

jest.mock("bcrypt");

describe("UserService", () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      getAll: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    userService = new UserService(mockUserRepository);
  });

  describe("Login", () => {
    it("should login user and return a userDtoResponse", async () => {
      const user = { email: "john@example.com", password: "123456" };

      const mockUserId = uuidv4();

      const mockUser = {
        id: mockUserId,
        username: "John Doe",
        email: "john@example.com",
        password: await bcrypt.hash("123456", 10),
        role: "guest",
      } as IUser;

      const expectedUserDtoResponse = new userDtoResponse(
        mockUserId,
        mockUser.username,
        mockUser.email,
        mockUser.role
      );

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await userService.login(user.email, user.password);

      expect(result).toEqual(expectedUserDtoResponse);
    });

    it("should throw an error if the user does not exist", async () => {
      const user = { email: "john@example.com", password: "123456" };

      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(
        userService.login(user.email, user.password)
      ).rejects.toThrow("User does not exist");
    });

    it("should throw an error if the password does not match", async () => {
      const user = { email: "john@example.com", password: "ffffff" };

      const mockUserId = uuidv4();

      const mockUser = {
        id: mockUserId,
        username: "John Doe",
        email: "john@example.com",
        password: await bcrypt.hash("123456", 10),
        role: "guest",
      } as IUser;

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        userService.login(user.email, user.password)
      ).rejects.toThrow("Password does not match");
    });
  });

  describe("Register", () => {
    it("should create a user and return a userDtoResponse", async () => {
      const userDtoRequest: userDtoRequest = {
        username: "John Doe",
        email: "john@example.com",
        password: "123456",
        role: "guest",
      };

      const mockUserId = uuidv4();

      const mockCreatedUser = {
        id: mockUserId,
        username: "John Doe",
        email: "john@example.com",
        role: "guest",
      } as userDtoResponse;

      const expectedUserDtoResponse = new userDtoResponse(
        mockUserId,
        userDtoRequest.username,
        userDtoRequest.email,
        userDtoRequest.role
      );

      mockUserRepository.create.mockResolvedValue(mockCreatedUser);

      const result = await userService.register(userDtoRequest);

      expect(result).toEqual(expectedUserDtoResponse);
      expect(mockUserRepository.create).toHaveBeenCalledWith(userDtoRequest);
    });

    it("should throw an error if the user already exists", async () => {
      const userDtoRequest: userDtoRequest = {
        username: "John Doe",
        email: "john@example.com",
        password: "123456",
        role: "guest",
      };

      mockUserRepository.findByEmail.mockResolvedValue({
        id: uuidv4(),
        username: "John Doe",
        email: "john@example.com",
        password: "hashedpassword",
        role: "guest",
      } as IUser);

      await expect(userService.register(userDtoRequest)).rejects.toThrow(
        "User already signed up"
      );
    });
  });

  describe("Find by id", () => {
    it("should return the user dto response based on the provided id", async () => {
      const id = "1234";

      const foundUser = {
        id: id,
        username: "Jonas",
        email: "jonas@mail.com",
        password: "12345",
        role: "guest",
      } as IUser;

      mockUserRepository.findById.mockResolvedValue(foundUser);

      const result = await userService.findById(id);

      expect(result).toEqual(
        expect.objectContaining({
          id: "1234",
          username: "Jonas",
          email: "jonas@mail.com",
        })
      );
    });

    it("should return null if there is no user to be found", async () => {
      const id = "1234";

      mockUserRepository.findById.mockResolvedValue(null);

      const result = await userService.findById(id);

      expect(result).toBeNull();
    });
  });

  describe("Get all", () => {
    it("should return an array of userDtoResponse", async () => {
      const user1 = {
        id: "1234",
        username: "Jonas",
        email: "jonas@mail.com",
        password: "12345",
        role: "guest",
      } as IUser;

      const usersResponse = [user1];

      mockUserRepository.getAll.mockResolvedValue(usersResponse);

      const result = await userService.getAll();

      expect(Array.isArray(result)).toBe(true);
      expect(mockUserRepository.getAll).toHaveBeenCalled();
      expect(mockUserRepository.getAll).toHaveBeenCalledTimes(1);
      expect(result).not.toBeNull();

      if (result != null) {
        expect(result[0]).toMatchObject({
          id: user1.id,
          username: user1.username,
          email: user1.email,
          role: user1.role,
        });
        expect(result[0]).not.toHaveProperty("password");
      }
    });
  });
});
