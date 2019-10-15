//const { db } = require('./.env')

// Update with your config settings.
// module.exports = {
//   client: "postgresql",
//   connection: {
//     database: "knowledge",
//     user: "postgres",
//     password: "200291"
//   },
//   pool: {
//     min: 2,
//     max: 10
//   },
//   migrations: {
//     tableName: "knex_migrations"
//   }
// };

module.exports = {
  client: "postgresql",
  debug: true,
  connection: {
    database: "knowledge",
    port: 5432,
    user: "postgres",
    password: "123",
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};

/**
 * .env
 * module.exports = {
    authSecret: 'test%%@123',
    db: {
        host : '127.0.0.1',
        port: 5432,
        database: "knowledge",
        user: "postgres",
        password: "200291"
    }
}
 */