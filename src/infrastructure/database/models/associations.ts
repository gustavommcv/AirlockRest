import Listing from "./Listing";
import Amenity from "./Amenity";
import ListingAmenity from "./ListingAmenity";
import User from "./User";

User.hasMany(Listing, { foreignKey: "hostId" });

Listing.belongsTo(User, { foreignKey: "hostId", as: "user" });
Listing.belongsToMany(Amenity, {
  through: ListingAmenity,
  foreignKey: "listingId",
  as: "amenities",
});

Amenity.belongsToMany(Listing, {
  through: ListingAmenity,
  foreignKey: "amenityId",
});
