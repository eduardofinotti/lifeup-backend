
exports.up = function(knex) {
    return knex.schema.createTable('phrases', function (table) {
        table.increments()
        table.string('phrase').notNullable()
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('phrases')
};
