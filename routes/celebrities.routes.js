const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model.js");

// GET "celebrities/"
router.get("/",  async (req, res, next) => {
  try{
    const celebrities = await Celebrity.find()

    res.render("celebrities/celebrities.hbs", {
      allCelebrities: celebrities
    })
  } catch(err){
    next(err)
  }
  
})

// GET "celebrities/create"
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

// POST "celebrities/create"
router.post("/create", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.create({
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
    });
    res.redirect("/celebrities");
  } catch (err) {
    next(err);
  }
});




module.exports = router;