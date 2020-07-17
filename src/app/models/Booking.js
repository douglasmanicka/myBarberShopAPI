const { Sequelize, Model } = require('sequelize');
require('dotenv/config');

class Booking extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
        // dialect: 'postgres',
        // dialectOptions: {
        //   useUTC: false, // for reading from database
        // },
        // timezone: '-03:00', // for writing to database
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

module.exports = Booking;
