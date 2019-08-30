const router = require("express").Router()
let Win = require("../models/win.model")

require("dotenv").config()

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require("twilio")(accountSid, authToken)
const MessagingResponse = require("twilio").twiml.MessagingResponse

router.route("/sms").post((req, res) => {
  const twiml = new MessagingResponse()
  twiml.message(`Good job. This is what you sent: ${req.body.Body}`)
  res.writeHead(200, { "Content-Type": "text/xml" })
  res.end(twiml.toString())
})

module.exports = router
