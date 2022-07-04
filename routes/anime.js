const express = require("express");
const animeControllers = require("../controllers/animeControllers");
const router = express.Router();


router.post("/anime", animeControllers.createAnimeList);
router.get("/", animeControllers.mainPage);

module.exports = router;
