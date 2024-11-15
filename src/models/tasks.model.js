const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
  },
  idUser: {
    type: DataTypes.STRING,
  },
});

module.exports = Task;
