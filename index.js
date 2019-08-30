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

app.post("/sms", (req, res) => {
  let gif_url =
    "https://media3.giphy.com/media/17pNCufIeSb7c0kqfa/giphy.gif?cid=70a630c4526ddfb43579e809754629ffb9c8f1cfdd5dd4f2&rid=giphy.gif"
  axios
    .get(
      `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=celebrate&rating=G`
    )
    .then(response => {
      gif_url = response.data.data.images.original.url
    })
    .catch(error => {
      console.log(error)
    })
  const twiml = new MessagingResponse()
  const message = twiml.message()
  message.body(`Great job on this win: ${req.body.Body}
  Here's a kitten`)
  message.media(
    "https://media3.giphy.com/media/17pNCufIeSb7c0kqfa/giphy.gif?cid=70a630c4526ddfb43579e809754629ffb9c8f1cfdd5dd4f2&rid=giphy.gif"
  )

  const description = req.body.Body

  const newWin = new Win({
    description
  })

  newWin.save().catch(err => res.status(400).json(`Error: ${err}`))
  res.writeHead(200, { "Content-Type": "text/xml" })
  res.end(twiml.toString())
})

app.listen(port, () => console.log("app listening on port " + port))
