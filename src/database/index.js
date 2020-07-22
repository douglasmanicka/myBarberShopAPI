const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');
const databaseConfig = require('../config/database');
const User = require('../app/models/User');
const File = require('../app/models/File');
const Booking = require('../app/models/Booking');

const models = [User, File, Booking];

class Database {
  constructor() {
    this.sequelize();
    this.mongo();
  }

  mongo() {
    this.connection = mongoose.connect(process.env.MONGO_CONNECTION, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }

  sequelize() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

module.exports = new Database();
