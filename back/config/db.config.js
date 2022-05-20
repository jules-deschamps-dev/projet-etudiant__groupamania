const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("data", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  port: "3306",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully ......");
} catch (error) {
  console.error("/!/ Unable to connect to the database", error);
}
module.exports = sequelize;
