const express = require('express');
const path = require('path');
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
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;

// yarn eslint --fix src --ext .js
