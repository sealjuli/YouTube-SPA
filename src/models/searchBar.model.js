const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SearchBar = sequelize.define("SearchBar", {
  search: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sortBy: {
    type: DataTypes.STRING,
  },
  count: {
    type: DataTypes.INTEGER,
  },
});

module.exports = SearchBar;
