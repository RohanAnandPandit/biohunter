import { QueryFile } = require("pg-promise");
import path from "path";

function sql(filename) {
  const sqlPath = path.join(__dirname, filename);
  return new QueryFile(sqlPath, { minify: true });
}

exports.userSQL = {
  newUser: sql("../sql/newUser.sql"),
  getUser: sql("../sql/getUser.sql"),
  authUser: sql("../sql/authUser.sql"),
}

exports.animalSQL = {
  getAnimal: sql("../sql/getAnimal.sql"),
}