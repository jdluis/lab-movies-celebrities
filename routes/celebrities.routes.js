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

// GET "celebrities/:id/celebrity-details" => Detalles de celebridad
router.get("/:id/celebrity-details", async (req, res, next) => {
    try{
      const { id } = req.params
      const celebrity = await Celebrity.findById(id)
      res.render(`celebrities/celebrity-details.hbs`,{
        celebrity: celebrity
      })
    } catch(err){
      next(err)
    }
})

// GET "celebrities/:id/edit-celebrity" => editar celebridad

router.get("/:id/edit-celebrity", async (req, res, next) => {
  try{
    const { id } = req.params
    const celebrity = await Celebrity.findById(id)
    res.render("celebrities/edit-celebrity.hbs", {
      celebrity: celebrity
    })
  } catch(err){
    next(err)
  }
  
})

// POST "celebrities/:id/edit-celebrity" => Recibiendo la informacion de update celebridad
router.post("/:id/edit-celebrity", async (req, res, next) => {
    try{
      const { id } = req.params
      const celebrity = await Celebrity.findByIdAndUpdate(id, {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
      })
      res.redirect("/celebrities")

    } catch(err){
      next(err)
    }
})

// POST "celebrities/:id" => DELETE celebridad
router.post("/:id", async (req, res, next) => {
  try{
    const { id } = req.params
    await Celebrity.findByIdAndDelete(id)
    res.redirect("/celebrities")
  } catch(err){
    next(err)
  }
})



module.exports = router;