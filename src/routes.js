const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const FileController = require('./app/controllers/FileController');
const ProviderController = require('./app/controllers/ProviderController');
const BookingController = require('./app/controllers/BookingController');
const authMiddleware = require('./app/middlewares/auth');
// const User = require('./app/models/User');

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.createSession);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.get('/providers', ProviderController.index);
routes.post('/bookings', BookingController.create);
routes.get('/bookings', BookingController.index);

routes.post('/files', upload.single('file'), FileController.store);
// routes.get('/', async (req, res) => {
//   // Test Create User
//   const user = await User.create({
//     name: 'TestCreateUser',
//     email: 'testCreateUser@email.com',
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
