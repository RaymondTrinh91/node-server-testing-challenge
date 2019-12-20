const router = require("express").Router();

const Pokemons = require("./pokemon-model.js");

router.get("/", (req, res) => {
  Pokemons.find()
    .then(pokemons => {
      res.status(200).json(pokemons);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Server was unable to retrieve Pokemon" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Pokemons.findById(id)
    .then(pokemon => {
      res.status(200).json(pokemon);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Server was unable to retrieve Pokemon" });
    });
});

router.post("/", (req, res) => {
  const newPoke = req.body;
  const { name, type, number } = req.body;

  if (!name || !type || !number) {
    res
      .status(400)
      .json({ message: "Please fill out Name, Type and Number of Pokemon" });
  } else {
    Pokemons.insert(newPoke)
      .then(pokemon => {
        res.status(201).json({ message: `${pokemon.name} was added`, pokemon });
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ message: "Server was unable to create Pokemon" });
      });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Pokemons.findById(id)
    .then(id => {
      if (!id) {
        res.status(400).json({ message: "Sorry we don't have that Pokemon" });
      } else {
        Pokemons.remove(id).then(deleted => {
          res
            .status(200)
            .json({ message: `${deleted} Pokemon(s) were deleted` });
        });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Server was unable to delete Pokemon(s)" });
    });
});

module.exports = router;
