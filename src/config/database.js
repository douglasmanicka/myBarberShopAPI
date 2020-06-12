require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST_DEV,
  username: process.env.POSTGRES_USER_DEV,
  password: process.env.POSTGRES_PASSWORD_DEV,
  database: process.env.POSTGRES_DATABASE_DEV,
  port: 5432,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
