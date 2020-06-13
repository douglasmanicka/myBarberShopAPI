const express = require('express');
const routes = require('./routes');

require('./database');

class App {
  constructor() {
    this.server = express();

    this.middleware();
    this.routes();
    if (process.env.NODE_ENV !== 'PROD') {
      require('dotenv/config');
    }
  }

  middleware() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;

// yarn eslint --fix src --ext .js
