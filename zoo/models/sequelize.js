const Sequelize = require("sequelize");

// DO NOT USE THESE VALUES IN PRODUCTION, OR THE ROOT USER FOR THAT MATTER
const DATABASE_NAME = "zoo";
const DATABASE_USERNAME = "root";
const DATABASE_PASSWORD = "tea";
const DATABASE_HOST = "http://127.0.0.1:43067";

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: "mysql"
});

module.exports = sequelize;