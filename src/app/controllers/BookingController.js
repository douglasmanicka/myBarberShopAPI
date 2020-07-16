const yup = require('yup');
const Booking = require('../models/Booking');
const User = require('../models/User');

class BookingController {
  async create(req, res) {
    const schema = yup.object().shape({
      provider_id: yup.number().required(),
      date: yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails ' });
    }

    const { provider_id, date } = req.body;

    /**
     * check is provider id is a provider
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'you can only create bookings with providers' });
    }

    const booking = await Booking.create({
      user_id: req.userId,
      provider_id,
      date,
    });
    return res.json(booking);
  }
}

module.exports = new BookingController();
