exports.up = function(knex) {
  return knex.schema.createTable("pokemon", poke => {
    poke.increments();

    poke
      .string("name")
      .notNullable()
      .unique();

    poke.string("type").notNullable();

    poke.integer("number").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("pokemon");
};