import Listing from "./Listing";
import Amenity from "./Amenity";
import ListingAmenity from "./ListingAmenity";

Listing.belongsToMany(Amenity, {
  through: ListingAmenity,
  foreignKey: "listingId",
});

Amenity.belongsToMany(Listing, {
  through: ListingAmenity,
  foreignKey: "amenityId",
});
