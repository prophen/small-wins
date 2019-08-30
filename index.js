const express = require("express")
const cors = require("cors")
const axios = require("axios")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Connect to MongoDB Atlas
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection

connection.once("open", () => {
  console.log("MongoDB database connection established successfully")
})

const winsRouter = require("./routes/wins")
app.use("/wins", winsRouter)

// const accountSid = process.env.ACCOUNT_SID
// const authToken = process.env.AUTH_TOKEN
// const client = require("twilio")(accountSid, authToken)
const MessagingResponse = require("twilio").twiml.MessagingResponse
let Win = require("./models/win.model")

app.use(bodyParser.urlencoded({ extended: false }))
const gifs = require("./gifs")
app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse()
  const message = twiml.message()

  message.body(`Great job on this win: ${req.body.Body}`)

  message.media(gifs[Math.floor(Math.random() * gifs.length)])

  const description = req.body.Body

  const newWin = new Win({
    description
  })

  newWin.save().catch(err => res.status(400).json(`Error: ${err}`))
  res.writeHead(200, { "Content-Type": "text/xml" })
  res.end(twiml.toString())
})

app.listen(port, () => console.log("app listening on port " + port))
