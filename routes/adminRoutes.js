const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminControllers");

/* ============================= GENERAL ROUTES ============================= */
// Render main page
router.get("/", adminControllers.mainPage);

/* ============================= ANIME ROUTES ============================= */
// Render add anime page and action form 
router.get("/animes/add", adminControllers.addAnimesPage);
router.post("/animes/add", adminControllers.createAnimeController);

// Render list all details animes
router.get("/animes", adminControllers.getAnimesPage);

// Render edit anime page and action form
router.get("/animes/:animeId/edit", adminControllers.editAnimePage);
router.post("/animes/:animeId/edit", adminControllers.editAnimeController);

// Action delete anime
router.get("/animes/:animeId/delete", adminControllers.deleteAnimeController);

/* ============================= EPISODE ROUTES ============================= */
// Render add source / episodes and action form
router.get("/episodes/add", adminControllers.addEpisodesPage);
router.post("/episodes/add", adminControllers.createEpisodesController);

// Render list all episodes
router.get("/animes/:animeId/episodes", adminControllers.getEpisodesPage);

// Render edit episode page and action form
router.get("/episodes/:episodeId/edit", adminControllers.editEpisodePage);
router.post("/episodes/:episodeId/edit", adminControllers.editEpisodeController);

// Action delete episode
router.get("/episodes/:episodeId/delete", adminControllers.deleteEpisodeController);

// Getter current Episode to add episode
router.get("/animes/:animeId/current", adminControllers.getCurrentEpisodeByIdController);

module.exports = router;
