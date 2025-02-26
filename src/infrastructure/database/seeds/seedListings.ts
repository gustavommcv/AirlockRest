import { v4 as uuidv4 } from "uuid";
import sequelize from "../connection";
import Listing from "../models/Listing";
import Amenity from "../models/Amenity";
import ListingAmenity from "../models/ListingAmenity";

const seedListings = async () => {
  try {
    await sequelize.sync();

    const amenities = await Amenity.findAll();
    const [
      sosButton,
      oxygenTanks,
      meteorShower,
      zeroGravityPool,
      antiGravityBed,
    ] = amenities;

    // Seed das listings
    const listings = await Listing.bulkCreate([
      {
        id: uuidv4(),
        title: "Luxury Space Station",
        description: "Experience the ultimate luxury in space.",
        costPerNight: 1000.0,
        locationType: "Space Station",
        numOfBeds: 2,
        photoThumbnail: "https://example.com/space-station.jpg",
        isFeatured: true,
        latitude: 45.6789,
        longitude: -123.4567,
        closedForBookings: false,
        hostId: "a1e3c60a-f92b-4bea-9b77-9afc22738e3f",
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        title: "Meteor Shower Camp",
        description: "Camp under the stars and watch meteor showers.",
        costPerNight: 250.0,
        locationType: "Campsite",
        numOfBeds: 4,
        photoThumbnail: "https://example.com/meteor-camp.jpg",
        isFeatured: false,
        latitude: 34.5678,
        longitude: -98.7654,
        closedForBookings: false,
        hostId: "a1e3c60a-f92b-4bea-9b77-9afc22738e3f",
        createdAt: new Date(),
      },
    ]);

    await ListingAmenity.bulkCreate([
      {
        listingId: listings[0].id,
        amenityId: sosButton.id,
      },
      {
        listingId: listings[0].id,
        amenityId: oxygenTanks.id,
      },
      {
        listingId: listings[0].id,
        amenityId: zeroGravityPool.id,
      },
      {
        listingId: listings[1].id,
        amenityId: meteorShower.id,
      },
      {
        listingId: listings[1].id,
        amenityId: antiGravityBed.id,
      },
    ]);

    console.log("✅ Listings and amenities seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding listings:", error);
  } finally {
    await sequelize.close();
  }
};

seedListings();
