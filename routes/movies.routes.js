const router = require("express").Router();

const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");

//GET "movies"

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find().populate("cast")
    console.log(movies)
    res.render("movies/movies.hbs", {
      movies: movies,
    });
  } catch (err) {
    next(err);
  }
});

// GET "movies/create"
router.get("/create", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find().select("name");
    res.render("movies/new-movie.hbs", {
      celebrities,
    });
    console.log(cast);
  } catch (err) {
    next(err);
  }
});

// POST "movies/create"
router.post("/create", async (req, res, next) => {
  try {
    console.log(req.body);
    await Movie.create({
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast,
    });

    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
