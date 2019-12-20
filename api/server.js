const express = require("express");

const pokeRouter = require("./pokemon/pokemon-router.js");

const server = express();

server.use(express.json());

server.use("/api/pokemon", pokeRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up", dbenv: process.env.DB_ENV });
});

module.exports = server;
