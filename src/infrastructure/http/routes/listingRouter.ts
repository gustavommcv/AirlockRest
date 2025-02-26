import { Router } from "express";
import { container } from "tsyringe";
import ListingController from "../controllers/ListingController";

const listingRouter = Router();

const listingControllerInstance =
  container.resolve<ListingController>("ListingController");

listingRouter.get(
  "/",
  listingControllerInstance.getListings.bind(listingControllerInstance)
);

export default listingRouter;
