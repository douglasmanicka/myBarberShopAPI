const { Router } = require('express');
// const User = require('./app/models/User');

const routes = new Router();

routes.get('/', async (req, res) => {
  // Test Create User
  // const user = await User.create({
  //   name: 'TestCreateUser2',
  //   email: 'testCreateUser2@email.com',
  //   password_hash: '12345678',
  // });
  return res.json({ yourEnv: `your  xxx env is ${process.env.NODE_ENV}` });
  // return res.json(user);
});

module.exports = routes;
