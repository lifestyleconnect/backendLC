exports.up = knex =>
  knex.schema.createTable('pins', (t) => {
    t.increments('id');
    t
      .integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');
    t.string('image_url');
    t.string('description');
    t.string('link');
  });

exports.down = knex => knex.schema.dropTable('pins');
