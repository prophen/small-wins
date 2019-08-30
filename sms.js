require('dotenv').config()

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

client.messages('MMf6d1901dabf14a1fb1d9b2a100738b15')
  // .create({
  //   body: 'Hello World',
  //   mediaUrl: 'https://placekitten.com/200',
  //   from: process.env.TWILIO_PHONE_NUMBER,
  //   to: process.env.RECEIVING_PHONE_NUMBER

  // })
  .fetch()
  .then(message => console.log(message.body))
