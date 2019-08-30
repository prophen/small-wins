const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true})
const connection = mongoose.connection

connection.once('open', () => {
  console.log("MongoDB database connection established successfully")
})

app.get("/", (req, res) => res.send("Hello World!"))


app.listen(port, () => console.log("app listening on port " + port))
