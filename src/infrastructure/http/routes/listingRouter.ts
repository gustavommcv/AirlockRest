import { Router } from "express";
import { container } from "tsyringe";
import ListingController from "../controllers/ListingController";
import hasRole from "../middlewares/hasRole";

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
  listingControllerInstance.postListing.bind(listingControllerInstance)
);

export default listingRouter;
