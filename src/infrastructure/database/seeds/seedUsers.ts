import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import sequelize from "../connection";
import User from "../models/User";

const seedUsers = async () => {
  try {
    await sequelize.sync();

    const password1 = await bcrypt.hash("password123", 10);
    const password2 = await bcrypt.hash("guestpass", 10);

    await User.bulkCreate([
      {
        id: uuidv4(),
        username: "space_host",
        email: "host@airlock.com",
        password: password1,
        role: "host",
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "cosmic_guest",
        email: "guest@airlock.com",
        password: password2,
        role: "guest",
        createdAt: new Date(),
      },
    ]);

    console.log("✅ Success!");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await sequelize.close();
  }
};

seedUsers();
