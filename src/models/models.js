const sequelize = require("../config/db");

const Users = require("./users.model");
const SearchBar = require("./searchBar.model");

/*
(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Tables synced");
  } catch (error) {
    console.error("Error syncing tables:", error);
  }
})();
*/

module.exports = { Users, SearchBar };
