const express = require("express");
const apiControllers = require("../controllers/apiControllers");
const router = express.Router();

router.get("/animes", apiControllers.getAllAnimeList);
router.get("/anime/search", apiControllers.getAllAnimeBySearch);
router.get("/anime/:detailInfo", apiControllers.getDetailAnimeByTitle);
router.get("/video/:detailInfo", apiControllers.playVideoAnime);

module.exports = router;
