const express = require("express")

const app = express()
const PORT = 8000

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server started on port: ${PORT}`)
})
