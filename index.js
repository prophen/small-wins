const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

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
// const smsRouter = require("./routes/sms")

app.use("/wins", winsRouter)
// app.use("/sms", smsRouter)

require("dotenv").config()

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require("twilio")(accountSid, authToken)
const MessagingResponse = require("twilio").twiml.MessagingResponse

app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse()
  twiml.message(`Good job. This is what you sent: ${req.body.body}`)
  res.writeHead(200, { "Content-Type": "text/xml" })
  res.end(twiml.toString())
})
app.listen(port, () => console.log("app listening on port " + port))
