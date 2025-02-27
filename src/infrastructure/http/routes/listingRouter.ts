import { Router } from "express";
import { container } from "tsyringe";
import ListingController from "../controllers/ListingController";
import hasRole from "../middlewares/hasRole";
import { body } from "express-validator";
import validationErrors from "../middlewares/validationsErrors";

const listingRouter = Router();

const listingControllerInstance =
  container.resolve<ListingController>("ListingController");

listingRouter.get(
  "/",
  listingControllerInstance.getListings.bind(listingControllerInstance)
);

listingRouter.post(
  "/",
  hasRole("host"),
  [
    body("title")
      .isString()
      .withMessage("Title must be a string")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ max: 50 })
      .withMessage("Title must be at most 50 characters long"),

    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ max: 500 })
      .withMessage("Description must be at most 500 characters long"),

    body("costPerNight")
      .isFloat({ min: 0 })
      .withMessage("Cost per night must be a non-negative number"),

    body("locationType")
      .isString()
      .withMessage("Location type must be a string")
      .notEmpty()
      .withMessage("Location type is required")
      .isLength({ max: 30 })
      .withMessage("Location type must be at most 30 characters long"),

    body("numOfBeds")
      .isInt({ min: 1 })
      .withMessage("Number of beds must be a positive integer"),

    body("photoThumbnail")
      .optional()
      .isURL()
      .withMessage("Photo thumbnail must be a valid URL")
      .isLength({ max: 150 })
      .withMessage("Photo thumbnail must be at most 150 characters long"),

    body("isFeatured").isBoolean().withMessage("isFeatured must be a boolean"),

    body("latitude")
      .optional()
      .isFloat({ min: -90, max: 90 })
      .withMessage("Latitude must be a valid decimal between -90 and 90"),

    body("longitude")
      .optional()
      .isFloat({ min: -180, max: 180 })
      .withMessage("Longitude must be a valid decimal between -180 and 180"),

    body("closedForBookings")
      .isBoolean()
      .withMessage("closedForBookings must be a boolean"),

    body("amenities")
      .isArray({ min: 1 })
      .withMessage("Amenities must be an array with at least one item"),

    body("amenities.*.category")
      .isString()
      .withMessage("Amenity category must be a string")
      .notEmpty()
      .withMessage("Amenity category is required")
      .isLength({ max: 30 })
      .withMessage("Amenity category must be at most 30 characters long"),

    body("amenities.*.name")
      .isString()
      .withMessage("Amenity name must be a string")
      .notEmpty()
      .withMessage("Amenity name is required")
      .isLength({ max: 30 })
      .withMessage("Amenity name must be at most 30 characters long"),
  ],
  validationErrors,
  listingControllerInstance.postListing.bind(listingControllerInstance)
);

export default listingRouter;
