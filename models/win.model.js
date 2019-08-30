const mongoose = require("mongoose")
const Schema = mongoose.Schema
const winSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    }
  },
  {
    timestamps: true
  }
)

const Win = mongoose.model("Win", winSchema)

module.exports = Win
