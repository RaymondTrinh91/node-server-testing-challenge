const db = require("../../data/db-config.js");

module.exports = {
  insert,
  update,
  find,
  findById,
  remove
};

function insert(pokemon) {
  return db("pokemon")
    .insert(pokemon, "id")
    .then(ids => {
      const [id] = ids;

      return db("pokemon")
        .where({ id })
        .first();
    });
}

async function update(id, changes) {
  return db("pokemon")
    .where({ id })
    .update(changes)
    .then(() => {
      return db("pokemon")
        .where({ id })
        .first();
    });
}

function find() {
  return db("pokemon");
}

function findById(id) {
  return db("pokemon")
    .where({ id })
    .first();
}

function remove(id) {
  return db("pokemon")
    .where({ id })
    .del();
}
