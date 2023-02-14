const router = require("express").Router();

const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");
const compareTwoArraysName = require("../utils/compareTwoArraysName.js");

//GET "movies"

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find().populate("cast");
    console.log(movies);
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

// GET "movies/:id"

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("cast");
    res.render("movies/movie-details.hbs", {
      movie: movie,
    });
  } catch (err) {
    next(err);
  }
});

//POST "movies/:id"

router.post("/:id", async (req, res, next) => {
  try {
    const movieId = req.params.id;
    await Movie.findByIdAndDelete(id);
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

//GET "/movies/:id/edit"

router.get("/:id/edit", async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId).populate("cast");
    const celebrities = await Celebrity.find();

    /* const celebritisNoSelected = [];

    for (let i = 0; movie.cast.length > i; i++) {
      celebrities.forEach((celebrity) => {
          if (celebrity.name !== movie.cast[i].name) {
            celebritisNoSelected.push(celebrity);
        }
      });
    } */

    const celebritisNoSelected = compareTwoArraysName(movie.cast, celebrities);
    console.log(celebritisNoSelected)
    res.render("movies/edit-movie.hbs", {
      movie: movie,
      celebrities: celebritisNoSelected,
    });
  } catch (err) {
    next(err);
  }
});

//POST "movies/:id/edit"
router.post("/:id/edit", async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const { title, genre, plot, cast } = req.body;
    await Movie.findByIdAndUpdate(movieId, {
      title: title,
      genre: genre,
      plot: plot,
      cast: cast,
    });

    res.redirect(`/movies/${movieId}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
