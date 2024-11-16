const sequelize = require("../config/db");

const Users = require("./users.model");
const SearchBar = require("./searchBar.model");

Users.hasMany(SearchBar, { foreignKey: "userId" });
SearchBar.belongsTo(Users, { foreignKey: "userId" });

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Tables synced");
  } catch (error) {
    console.error("Error syncing tables:", error);
  }
})();

module.exports = { Users, SearchBar };
