var Sequelize = require("sequelize");

// local connection settings
var dev = new Sequelize("customapp", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    define: {
        timestamps: false,
    },
});
var sequelize = dev;
var shop;

// checks the database connectivity
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    }); 

var shop = sequelize.import("./shop.model");

var db = {};

db.shop = shop;

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
