const { Sequelize, Model } = require('sequelize');

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        original_name: Sequelize.STRING,
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

module.exports = File;
