import Listing from "./Listing";
import Amenity from "./Amenity";
import ListingAmenity from "./ListingAmenity";
import User from "./User";

User.hasMany(Listing, { foreignKey: "hostId" });

Listing.belongsTo(User, { foreignKey: "hostId" });
Listing.belongsToMany(Amenity, {
  through: ListingAmenity,
  foreignKey: "listingId",
});

Amenity.belongsToMany(Listing, {
  through: ListingAmenity,
  foreignKey: "amenityId",
});
