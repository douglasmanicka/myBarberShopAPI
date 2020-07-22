const yup = require('yup');
const { startOfHour, parseISO, isBefore } = require('date-fns');
const Booking = require('../models/Booking');
const User = require('../models/User');
const File = require('../models/File');

class BookingController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const bookings = await Booking.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(bookings);
  }

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
     * check if provider_id is a provider
     * you can only booking with a  provider
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'you can only create bookings with providers' });
    }

    /**
     *  # Time rules:
     *  [x] the user cannot reserve a past date
     *  [X] the user cannot reserve a past time
     *  [x] allow only one booking per hour
     *  [x] check if the booking date/time is not being used
     */

    /**
     * Check for past dates
     */
    const hourStart = startOfHour(parseISO(date));
    console.log(`hourStart = ${hourStart}`);
    console.log(`hourStart = ${new Date()}`);

    if (isBefore(hourStart, new Date())) {
      console.log(`hourStart = ${hourStart}`);
      console.log(`hourStart = ${new Date()}`);
      return res.status(400).json({ error: 'Past date are not permited' });
    }

    /**
     * Check availability
     */

    const checkAvailability = await Booking.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    /**
     * date conversion from postgress to pass to the frontend
     * format dates came to frontend:
     * "2020-07-16T15:00:00-03:00" or "2020-07-16 22:00:00"
     * request body format:
     * {
     *  "provider_id": 8,
     *  "date": "2020-07-16 22:00:00"
     *  }
     */
    // console.log(`Booking Example: = ${JSON.stringify(checkAvailability)}`);
    // const dateFromPostgress = parseISO('2020-07-17T01:00:00.000Z');
    // const fullHour = `${dateFromPostgress.getHours()}:${dateFromPostgress.getMinutes()}:${dateFromPostgress.getSeconds()}`;
    // const fullDate = `${dateFromPostgress.getFullYear()}-${
    //   dateFromPostgress.getMonth() + 1
    // }-${dateFromPostgress.getDate()}`;
    // console.log(`Date: ${fullDate}`);
    // console.log(`Hour: ${fullHour}`);

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Booking date is not available', checkAvailability });
    }

    const booking = await Booking.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });
    return res.json(booking);
  }
}

module.exports = new BookingController();
