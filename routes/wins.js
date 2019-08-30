const router = require("express").Router()
let Win = require("../models/win.model")

router.route("/").get((req, res) => {
  Wins.find()
    .then(wins => res.json(wins))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route("/add").post((req, res) => {
  const description = req.body.description
  const mediaUrl = req.body.mediaUrl
  const date = Date.parse(req.body.date)

  const newWin = new Win({
    description,
    mediaUrl,
    date
  })

  newWin
    .save()
    .then(() => res.json("Win added!"))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router
