const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = app => {
  app.use(bodyParser.json()); // interpreta o corpo da requisição
  app.use(cors());
};
