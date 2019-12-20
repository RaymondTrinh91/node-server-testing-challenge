const Pokemons = require("./pokemon-model.js");
const db = require("../../data/db-config.js");

describe("Pokemon Model", function() {
  beforeEach(async () => {
    await db("pokemon").truncate();
  });

  describe("insert()", function() {
    it("should add a new pokemon to the database", async function() {
      await Pokemons.insert({ name: "Pikachu", type: "Electric", number: 25 });

      const pokemon = await db("pokemon");
      expect(pokemon).toHaveLength(1);
    });

    it("should return new pokemon info after adding", async function() {
      await Pokemons.insert({
        name: "Raichu",
        type: "Electric",
        number: 26
      }).then(poke => {
        expect(poke).toEqual({
          id: 1,
          name: "Raichu",
          type: "Electric",
          number: 26
        });
      });
    });
  });

  describe("update()", function() {
    it("should update pokemon to new pokemon", async function() {
      await Pokemons.insert({ name: "Pikachu", type: "Electric", number: 25 });
      await Pokemons.insert({ name: "Raichu", type: "Electric", number: 26 });
      await Pokemons.update(2, {
        name: "Alolan Raichu",
        type: "Electric, Psychic"
      });

      const updatedRaichu = await db("pokemon")
        .select("name", "type", "number")
        .where({ id: 2 })
        .first();
      expect(updatedRaichu).toEqual({
        name: "Alolan Raichu",
        type: "Electric, Psychic",
        number: 26
      });
    });
  });
});
