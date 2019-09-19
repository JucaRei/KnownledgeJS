
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('name').notNull()
    table.string('email').notNull().unique()
    table.string('password').notNull()
    table.boolean('admin').notNull().defaultTo(false)
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
};

// exports.up = function(knex, Promise) {
//   return knex.schema.createTable("users", table => {
//     table.increments("id").primary(); // auto-incremento, primaria
//     table.string("name").notNull();
//     table.string('email').notNull().unique()
//     table.string('password').notNull()
//     table.boolean('admin').notNull().defautTo(false)  // por padrão o campo admin é falso
//   });
// };

// exports.down = function(knex, Promise) {
//   return knex.schema.dropTable('users')
// };


