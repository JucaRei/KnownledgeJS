const config = require("../knexfile.js");
const knex = require("knex")(config);

// executa as migrations automaticamente
knex.migrate.latest([config])

//acessa o knex, diretamente no arquivo index
module.exports = knex;
