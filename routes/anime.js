const express = require("express");
const animeControllers = require("../controllers/animeControllers");
const router = express.Router();


router.post("/lists", animeControllers.createAnimeList);

module.exports = router;
