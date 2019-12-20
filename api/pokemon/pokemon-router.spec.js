const request = require("supertest");
const Pokemons = require("./pokemon-model.js");
const db = require("../../data/db-config.js");
const server = require("../server.js");

describe("/api/pokemon", function() {
  beforeEach(async () => {
    await db("pokemon").truncate();
  });

  describe("Get /", function() {
    it("Should send a 200 ok", function() {
      return request(server)
        .get("/api/pokemon")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("Should return all entries in the database", async function() {
      await Pokemons.insert({
        name: "Bulbasaur",
        type: "Grass",
        number: 1
      });
      await Pokemons.insert({
        name: "Ivysaur",
        type: "Grass, Poison",
        number: 2
      });
      await Pokemons.insert({
        name: "Venusaur",
        type: "Grass, Poison",
        number: 3
      });

      return request(server)
        .get("/api/pokemon")
        .then(res => {
          expect(res.body.length).toBe(3);
        });
    });
  });

  describe("POST to /", function() {
    it("Should be able to see Pokemon's name after posting", function() {
      return request(server)
        .post("/api/pokemon")
        .send({
          name: "Charmander",
          type: "Fire",
          number: 4
        })
        .then(res => {
          expect(res.body.message).toBe("Charmander was added");
        });
    });

    it("Should send a 400 if missing Name/Body/Number", function() {
      return request(server)
        .post("/api/pokemon")
        .send({
          name: "Pikaboo"
        })
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
  });

  describe("DELETE to /:id", function() {
    it("Should send a 400 if id does not exist", function() {
      return request(server)
        .delete("/api/pokemon/99")
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    it("Should delete pokemon", async function(){
        await Pokemons.insert({
            name: "Bulbasaur",
            type: "Grass",
            number: 1
          });
           return request(server)
            .delete("/api/pokemon/1")
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
  });
});
