const { Schema, model } = require("mongoose")

const schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
})

module.exports = model("Author", schema)
