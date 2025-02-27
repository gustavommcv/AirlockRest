import { container } from "tsyringe";
import { ModelStatic } from "sequelize";
import User from "./infrastructure/database/models/User";
import { IUser } from "./domain/entities/IUser";
import { IUserRepository } from "./domain/respositoryContracts/IUserRepository";
import { UserService } from "./application/services/UserService";
import { IUserService } from "./domain/serviceContracts/IUserService";
import UserRepository from "./infrastructure/repositories/UserRepository";
import AuthController from "./infrastructure/http/controllers/AuthController";
import UserController from "./infrastructure/http/controllers/UserController";
import ListingController from "./infrastructure/http/controllers/ListingController";
import { IListing } from "./domain/entities/IListing";
import Listing from "./infrastructure/database/models/Listing";
import IListingRepository from "./domain/respositoryContracts/IListingRepository";
import ListingRepository from "./infrastructure/repositories/ListingRepository";
import { IListingService } from "./domain/serviceContracts/IListingService";
import ListingService from "./application/services/ListingService";
import { IAmenity } from "./domain/entities/IAmenity";
import Amenity from "./infrastructure/database/models/Amenity";
import { IListingAmenity } from "./domain/entities/IListingAmenity";
import ListingAmenity from "./infrastructure/database/models/ListingAmenity";

container.register("AuthController", { useClass: AuthController });
container.register("UserController", { useClass: UserController });
container.register("ListingController", { useClass: ListingController });

container.register<ModelStatic<IUser>>("UserModel", { useValue: User });
container.register<ModelStatic<IListing>>("ListingModel", {
  useValue: Listing,
});
container.register<ModelStatic<IAmenity>>("AmenityModel", {
  useValue: Amenity,
});
container.register<ModelStatic<IListingAmenity>>("ListingAmenityModel", {
  useValue: ListingAmenity,
});

container.register<IUserRepository>("IUserRepository", {
  useClass: UserRepository,
});
container.register<IListingRepository>("IListingRepository", {
  useClass: ListingRepository,
});

container.register<IUserService>("IUserService", { useClass: UserService });
container.register<IListingService>("IListingService", {
  useClass: ListingService,
});
