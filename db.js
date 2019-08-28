const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres"
});

sequelize
  .authenticate()
  .then(() => console.log("connected to database"), err => console.log(err));

module.exports = sequelize;
