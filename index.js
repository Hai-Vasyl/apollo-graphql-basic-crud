const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
const PORT = 8000

const startServer = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => console.log("MongoDB successfully started!")
    )

    app.use("/graphql", graphqlHTTP({ schema, graphiql: true }))

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
  } catch (error) {
    console.log(`Server error: ${error.message}`)
  }
}

startServer()
