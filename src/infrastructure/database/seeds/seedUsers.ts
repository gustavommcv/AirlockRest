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
        id: "a1e3c60a-f92b-4bea-9b77-9afc22738e3f",
        username: "space_host",
        email: "host@airlock.com",
        password: password1,
        role: "host",
        createdAt: new Date(),
      },
      {
        id: "b2f93a99-682e-4c32-bafb-fc9d8b837b8e",
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
