const { Users } = require("../models/models");

class UsersServices {
  async findUserByLogin(login) {
    const user = await Users.findOne({ where: { login } });
    return user;
  }

  async saveUser(user) {
    const newUser = await Users.create(user);
    return newUser;
  }
}

module.exports = new UsersServices();

/*
const User = require("../models/usersModel");
class UsersServices {
  async findUserByLogin(login) {
    const user = await User.findOne({ login });
    return user;
  }

  async saveUser(user) {
    const newUser = new User(user);
    const result = newUser.save();
    return result;
  }
}

module.exports = new UsersServices();
*/

/*
const { getConnection, useDefaultDb } = require("../helpers/mongoHelper");

class UsersServices {
  #COLLECTION = "users";

  async findUserByLogin(login) {
    const connection = await getConnection();
    const db = useDefaultDb(connection);
    const user = await db
      .collection(this.#COLLECTION)
      .aggregate([{ $match: { login } }])
      .toArray();
    connection.close();
    return user[0];
  }

  async saveUser(user) {
    const connection = await getConnection();
    const db = useDefaultDb(connection);
    await db.collection(this.#COLLECTION).insertOne(user);
    connection.close();
  }
}

module.exports = new UsersServices();
*/

/*
const FileHelper = require("../helpers/fileHelper");

class UsersServices {

  async findUserByLogin(login) {
    const users = await FileHelper.readFile("users.json");
    return users.find((val) => val.login === login);
  }

  async saveUser(user) {
    const users = await FileHelper.readFile("users.json");
    users.push(user);
    return await FileHelper.writeFile("users.json", users);
  }

}

module.exports = new UsersServices();
*/
