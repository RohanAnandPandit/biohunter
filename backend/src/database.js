import { userSQL } from "./sql";

const pgp = require("pg-promise")({});
// require("dotenv").config();

const dbInfo = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};

const db = pgp(dbInfo);

export default class Database {
  static async newUser(attr) {
    var result = {};

    await db
      .one(userSQL.newUser, attr)
      .then((data) => {
        console.log(data);
        result = data;
      })
      .catch((error) => {
        console.log("ERROR:", error); // print error;
      });

    return result;
  }
}