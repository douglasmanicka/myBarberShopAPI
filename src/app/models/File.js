const { Sequelize, Model } = require('sequelize');
require('dotenv/config');

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        original_name: Sequelize.STRING,
        name: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.MYBARBERSHOP_BASE_URL_DEV}/files/${this.name}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

module.exports = File;
