const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: Types.ObjectId, ref: "Author", required: true },
})

module.exports = model("Book", schema)
