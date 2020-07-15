const multer = require('multer');
const crypto = require('crypto');
const { extname, resolve } = require('path');

/*
TODO: refactor to save S3
(https://gist.github.com/adon-at-work/26c8a8e0a1aee5ded03c)
*/
module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return callback(err);
        return callback(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
