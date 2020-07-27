const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Protest = require("../models/protest")(sequelize, Sequelize);

module.exports = db;
