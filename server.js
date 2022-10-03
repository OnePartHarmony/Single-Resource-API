require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require("path")

const Cake = require("./models/cakes")

const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log(error))

const app = express()

//////Middleware/////
app.use(morgan("tiny"))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(express.json())

//////Routes//////////

app.get("/", (req,res) => {
    res.send("The server is running.  Nothing on the homepage yet")
})


/////seed////
app.get("/cakes/seed", (req, res) => {
    const starterCakes = [
        { name: "wacky", frosting: "chocolate", diameter: 8, layers: 1, hasFilling: false },
        { name: "harvey wallbanger", frosting: "glaze", diameter: 10, hasFilling: false },
        { name: "boston cream pie", frosting: "ganache", diameter: 8, layers: 2, hasFilling: true },
        { name: "red velvet", frosting: "cream cheese", diameter: 9, layers: 2, hasFilling: false },
        { name: "black and white", frosting: "buttercream", diameter: 8, layers: 2, hasFilling: true },
        { name: "carrot", frosting: "cream cheese", diameter: 9, layers: 2, hasFilling: false },
    ]
    Cake.deleteMany({})
        .then(() => {
            Cake.create(starterCakes)
                .then(data => {
                    res.json(data)
                })            
        })
})

/////index/////
app.get("/cakes", (req,res) => {
    Cake.find({})
        .then(cakes => {
            res.json({cakes: cakes})
        })
        .catch(console.error)
})

/////create/////
app.post("/cakes", (req,res) => {
    Cake.create(req.body)
        .then(cake => {
            res.status(201).json({cake: cake.toObject()})
        })
        .catch(console.error)
})





/////Server Listener///////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))