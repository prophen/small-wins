const router = require("express").Router()
let Win = require("../models/win.model")
require("dotenv").config()

router.route("/").get((req, res) => {
  Win.find()
    .then(wins => res.json(wins))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route("/add").post((req, res) => {
  const description = req.body.description

  const newWin = new Win({
    description
  })

  newWin
    .save()
    .then(() => res.json("Win added!"))
    .catch(err => res.status(400).json(`Error: ${err}`))
})
router.route("/:id").delete((req, res) => {
  Win.findByIdAndDelete(req.params.id)
    .then(win => res.json("Win deleted ☹"))
    .catch(err => res.status(400).json("Error: " + err))
})
router.route("/update/:id").post((req, res) => {
  Win.findById(req.params.id)
    .then(win => {
      win.description = req.body.description

      win
        .save()
        .then(() => res.json("Win updated!"))
        .catch(err => res.status(400).json("Error: " + err))
    })
    .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router
