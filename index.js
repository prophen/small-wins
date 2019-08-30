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
const smsRouter = require("./routes/sms")

app.use("/wins", winsRouter)
app.use("/sms", smsRouter)

app.listen(port, () => console.log("app listening on port " + port))
