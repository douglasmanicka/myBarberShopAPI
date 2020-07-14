const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const authheader = req.headers.authorization;
  console.log(authheader);

  if (!authheader) {
    return res.status(401).json({ error: 'token not provided' });
  }
  const [, token] = authheader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.MYBARBERSHOP_TOKEN_SECRET
    );
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
};
