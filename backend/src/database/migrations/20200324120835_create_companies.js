exports.up = function(knex) {
  return knex.schema.createTable('Companies', function(table) {
    table.increments('Id').primary();
    table.string('Code').notNullable();
    table.string('Name').notNullable();
    table.string('Email').notNullable();
    table.string('WhatsApp').notNullable();
    table.string('City').notNullable();
    table.string('State', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Companies');
};
