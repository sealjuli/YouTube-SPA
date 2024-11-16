const db = require("../config/db");
const { SearchBar } = require("../models/models");

class VideosServices {
  async saveSearchBar(body) {
    try {
      const result = await SearchBar.create(body);

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async updateSearchBar(id, body) {
    try {
      const result = await SearchBar.update({ ...body }, { where: { id } });

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getSearchBar(userId) {
    try {
      const result = await SearchBar.findAll({
        where: { userId },
        order: ["id"],
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async findSearchById(userId, id) {
    try {
      const result = await SearchBar.findAll({
        where: { userId, id },
      });
      return result[0];
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new VideosServices();
