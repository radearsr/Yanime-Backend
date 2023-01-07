const express = require("express");
const router = express.Router();
const adminControllers = require("../Controllers/adminControllers");

router.get("/", adminControllers.mainPage);

router.get("/add-anime", adminControllers.addAnimeListPage);
router.post("/add-anime", adminControllers.createAnimeList);
router.get("/edit-anime/:animeId", adminControllers.getAnimeListById);
router.post("/edit-anime/:animeId", adminControllers.editAnimeListById);
router.get("/del-anime/:animeId", adminControllers.delAnimeListById);

router.get("/list-anime", adminControllers.getAllAnimeList);
router.get("/list-src/:animeId", adminControllers.getAllAnimeSource);

router.get("/add-src", adminControllers.addAnimeSourcePage);
router.post("/add-src", adminControllers.createAnimeSource);
router.get("/edit-src/:sourceId", adminControllers.getAnimeSourceById);
router.post("/edit-src/:sourceId", adminControllers.editAnimeSourceById);
router.get("/del-src/:sourceId", adminControllers.delAnimeSourceById);

module.exports = router;
