const express = require("express")
const app = express()
const PORT = 3000
const mongoose = require("mongoose")
app.use(express.json())

const Academia = mongoose.model("Academia", {
  name: String,
  description: String,
  value: Number,
  image_url: String,
})

app.get("/", async (req, res) => {
  const academs = await Academia.find()
  return res.send(academs)
})

app.delete("/:id", async (req, res) => {
  const academia = await Academia.findByIdAndDelete(req.params.id)
  return res.send(academia)
})

app.put("/:id", async (req, res) => {
  const academia = await Academia.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      value: req.body.value,
      image_url: req.body.image_url,
    },
    {
      new: true,
    }
  )
  return res.send(academia)
})

app.post("/", (req, res) => {
  const academia = new Academia({
    name: req.body.name,
    description: req.body.description,
    value: req.body.value,
    image_url: req.body.image_url,
  })
  academia.save()
  res.send(academia)
})

app.listen(PORT, () => {
  mongoose.connect(
    "mongodb+srv://peuigor09:qs6qitOHzQnudDJe@academiaapi.sis2ggk.mongodb.net/?retryWrites=true&w=majority"
  )

  console.log("Server On!")
})
