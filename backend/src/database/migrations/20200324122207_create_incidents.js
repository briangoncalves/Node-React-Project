exports.up = function(knex) {
  return knex.schema.createTable('Incidents', function(table) {
    table.increments('Id').primary();
    table.string('Title').notNullable();
    table.string('Description').notNullable();
    table.decimal('Value').notNullable();
    table.integer('CompanyId').notNullable();

    table
      .foreign('CompanyId')
      .references('Id')
      .inTable('Companies');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Incidents');
};
