require("dotenv").config()

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require("twilio")(accountSid, authToken)

client.messages.create({
  body: "Hello World",
  mediaUrl: "https://placekitten.com/200",
  from: process.env.TWILIO_PHONE_NUMBER,
  to: process.env.RECEIVING_PHONE_NUMBER
})
