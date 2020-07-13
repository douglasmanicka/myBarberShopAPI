const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
// const User = require('./app/models/User');

const routes = new Router();

routes.post('/users', UserController.store);

// routes.get('/', async (req, res) => {
//   // Test Create User
//   const user = await User.create({
//     name: 'TestCreateUser2',
//     email: 'testCreateUser2@email.com',
//     password_hash: '12345678',
//     provider: true,
//   });
//   return res.json({
//     yourEnv: `your  enviroment env is ${process.env.NODE_ENV}`,
//     myUser: user,
//   });
//   // res.json(user);
// });

module.exports = routes;
