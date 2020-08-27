// As Email Service i used MAILTRAP just for test
// TODO - Refactor to use AWS-SES

module.exports = {
  host: process.env.SMTP_SERVER,
  port: 2525,
  secure: false,
  // service: 'mailtrap.io',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_FROM_PASSWORD,
  },
  default: {
    from: 'MyBarberShop Team  <noreply@mybarbershop.com>',
  },
};
