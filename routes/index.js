const router = require("express").Router();

const celebrities = require ("./celebrities.routes");
const movies = require ("./movies.routes");

router.use("/celebrities", celebrities);
router.use("/movies", movies);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
