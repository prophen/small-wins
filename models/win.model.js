const mongoose = require("mongoose")
const Schema = mongoose.Schema
const winSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    mediaUrl: { type: String, required: false },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
)

const Win = mongoose.model("Win", winSchema)

module.exports = Win
