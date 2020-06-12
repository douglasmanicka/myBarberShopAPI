module.exports = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST_DEV,
  usarname: process.env.POSTGRES_USARNAME_DEV,
  password: process.env.POSTGRES_PASSWORD_DEV,
  database: process.env.POSTGRES_DATABASE_DEV,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
