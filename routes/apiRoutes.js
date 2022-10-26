const express = require("express");
const apiControllers = require("../controllers/apiControllers");
const router = express.Router();

// Get Anime By Type
router.get("/animes", apiControllers.getAnimesByTypeController);

// Get Detail Anime By ID
router.get("/animes/:animeIdentity/details", apiControllers.getDetailAnimeById);

// Get Anime By Search
router.get("/animes/search", apiControllers.getAllAnimeBySearch);

// Get Anime For Carousel
router.get("/animes/:limit/carousel", apiControllers.getAnimesForCarousel);

// Get Anime Poster 
router.get("/animes/:id/poster", apiControllers.getAnimePosterController);

module.exports = router;


//redirector.gdrivecdn.me/drive/index.php?id=U820OC6071nYrRkQk6nuXgaGhlDgAOGGjA0SJoDxNk7mMzLcB0%2FBcnUAEU4JQe6cilK5MS%2FnK7bNEB92Nz%2Fr9lraxpISUJ9rcK1M%2Br304BZ7x%2BCDIqZgJjIZaNFhIUcDkJLF25SvL4tQewTACSwLn%2FN3k%2FAF%2BvaIVtb4%2FcA6TPKobs%2FyeGhlgGPmx6r6Mp3zK4kyy7%2BZeov30gz8QKOX0T92mi7jxExhWWek85%2B%2BXdIA%3D%3D&ref=https%3A%2F%2F185.224.82.210%2F3d-kanojo-real-girl-episode-01%2F&sandbox=&t=1666348808273&ref=https://185.224.82.193/&res=360

