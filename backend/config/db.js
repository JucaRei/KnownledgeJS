const config = require("../knexfile.js");
const knex = require("knex")(config);

//acessa o knex, diretamente no arquivo index
module.exports = knex;
