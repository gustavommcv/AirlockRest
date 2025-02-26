import { v4 as uuidv4 } from "uuid";
import sequelize from "../connection";
import Amenity from "../models/Amenity";

import "../models/associations";

const seedAmenities = async () => {
  try {
    await sequelize.sync();

    await Amenity.bulkCreate([
      {
        id: uuidv4(),
        category: "Space Survival",
        name: "SOS Button",
      },
      {
        id: uuidv4(),
        category: "Space Survival",
        name: "Oxygen Tanks",
      },
      {
        id: uuidv4(),
        category: "Outdoors",
        name: "Meteor Shower View",
      },
      {
        id: uuidv4(),
        category: "Outdoors",
        name: "Zero-Gravity Pool",
      },
      {
        id: uuidv4(),
        category: "Comfort",
        name: "Anti-Gravity Bed",
      },
      {
        id: uuidv4(),
        category: "Comfort",
        name: "Interstellar Wi-Fi",
      },
    ]);

    console.log("✅ Amenities seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding amenities:", error);
  } finally {
    await sequelize.close();
  }
};

seedAmenities();
