// alterar a tabela criando uma coluna
//timestamp campo com data e hora , que foi incluido/excluido
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.timestamp('deletedAt')
    })
};

// alterar a tabela excluindo uma coluna
exports.down = function (knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('deletedAt')
    })
};

//knex migrate:make add_deleted_at_table_users
//knex migrate:latest