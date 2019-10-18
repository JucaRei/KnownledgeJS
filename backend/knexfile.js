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
  client: "postgres",
  debug: false,
  connection: {
    database: "knowledge",
    port: 5432,
    user: "postgres",
    password: "123",
  },
  pool: {
    min: 2,
    max: 10,
    // createTimeoutMillis: 3000,
    // acquireTimeoutMillis: 30000,
    // idleTimeoutMillis: 30000,
    // reapIntervalMillis: 1000,
    // createRetryIntervalMillis: 100,
    // propagateCreateError: false
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