const { Router } = require('express');

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ yourEnv: `your  xxx env is ${process.env.NODE_ENV}` });
});

module.exports = routes;
