const File = require('../models/File');

class FileController {
  async store(req, res) {
    const { originalname: original_name, filename: name } = req.file;

    const file = await File.create({
      original_name,
      name,
    });
    return res.json(file);
  }
}

module.exports = new FileController();
