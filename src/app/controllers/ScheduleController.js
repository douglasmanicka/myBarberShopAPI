const { startOfDay, endOfDay, parseISO } = require('date-fns');
const { Op } = require('sequelize');
const Booking = require('../models/Booking');
const User = require('../models/User');

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      res.status(401).json({ error: 'User is not a provider!' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const bookings = await Booking.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    });

    return res.json(bookings);
  }
}

module.exports = new ScheduleController();
