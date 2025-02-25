import { UserService } from "../application/services/UserService";
import UserRepository from "../infrastructure/repositories/UserRepository";
import { userDtoRequest } from "../application/dtos/userDtoRequest";
import { userDtoResponse } from "../application/dtos/userDtoResponse";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../infrastructure/database/connection";
import { IUser } from "../domain/entities/IUser";
import bcrypt from "bcrypt";

jest.mock("bcrypt");

describe("UserService", () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeAll(async () => {
    await sequelize.authenticate();
  });

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    userService = new UserService(mockUserRepository);
  });

  it("Login - should login user and return a userDtoResponse", async () => {
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

  it("Login - should throw an error if the user do not exists", async () => {
    const user = { email: "john@example.com", password: "123456" };

    await expect(userService.login(user.email, user.password)).rejects.toThrow(
      "User does not exist"
    );
  });

  it("Login - should throw an error if the passsword does not match", async () => {
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

    await expect(userService.login(user.email, user.password)).rejects.toThrow(
      "Password does not match"
    );
  });

  it("Register - should create a user and return a userDtoResponse", async () => {
    const userDtoRequest: userDtoRequest = {
      username: "John Doe",
      email: "john@example.com",
      password: "123456",
      role: "guest",
    };

    const mockUserId = uuidv4();

    const expectedUserDtoResponse = new userDtoResponse(
      mockUserId,
      userDtoRequest.username,
      userDtoRequest.email,
      userDtoRequest.role
    );

    mockUserRepository.create.mockResolvedValue(expectedUserDtoResponse);

    const result = await userService.register(userDtoRequest);

    expect(result).toEqual(expectedUserDtoResponse);

    expect(mockUserRepository.create).toHaveBeenCalledWith(userDtoRequest);
  });

  it("Register - should throw an error if the user already exists", async () => {
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

  it("Find by id - should return the user dto response based on the provided id", async () => {
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

  it("Find by id - should return null if there is no user to be found", async () => {
    const id = "1234";

    mockUserRepository.findById.mockResolvedValue(null);

    const result = await userService.findById(id);

    expect(result).toBeNull();
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
