const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminControllers");

router.get("/", adminControllers.mainPage);
router.get("/add-anime", adminControllers.addAnimeListPage);
router.post("/add-anime", adminControllers.createAnimeList);
router.get("/add-eps", adminControllers.addAnimeEpisodePage);
router.post("/add-eps", adminControllers.createAnimeEpisode);

module.exports = router;
