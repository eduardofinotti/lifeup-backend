
exports.up = function(knex) {
    return knex.schema.createTable('allphrases', function (table) {
        table.increments()
        table.string('phrase').notNullable()
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('allphrases')
};
