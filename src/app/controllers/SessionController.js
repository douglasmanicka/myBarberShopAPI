const jwt = require('jsonwebtoken');
require('dotenv/config');
const User = require('../models/User');

class SessionController {
  async createSession(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid User or Password!' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Invalid User or Password!' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, process.env.MYBARBERSHOP_TOKEN_SECRET, {
        expiresIn: process.env.MYBARBERSHOP_TOKEN_EXPIRES,
      }),
    });
  }
}

module.exports = new SessionController();
