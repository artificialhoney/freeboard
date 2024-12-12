import { createRequire } from "module";
const require = createRequire(import.meta.url);

require("dotenv").config();

export const config = Object.freeze({
  mongoUrl:
    process.env.MONGO_URL || "mongodb://freeboard:unsecure@localhost:27017",
  port: Number(process.env.PORT) || 4001,
  jwtSecret: process.env.JWT_SECRET || "freeboard",
  jwtTimeExpiration: process.env.JWT_TIME_EXPIRATION || "2h",
  userLimit: Number(process.env.USER_LIMIT) || 0,
  adminEmail: process.env.ADMIN_EMAIL || "admin@freeboard",
  adminPassword: process.env.ADMIN_PASSWORD || "freeboard",
  createAdmin: process.env.CREATE_ADMIN === "false" ? false : true,
});
