import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize({
  host: process.env.DB_HOST as string,
  dialect: "mariadb",
  username: process.env.DB_USER_NAME as string,
  password: process.env.DB_USER_PASSWORD as string,
  database: process.env.DB_NAME as string,
  port: 3306,
  logging: false,
});

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
}

initializeDatabase();

export default sequelize;
