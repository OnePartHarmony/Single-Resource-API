require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require("path")

const Cake = require("./models/cakes")



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

/////show/////
app.get("/cakes/:id", (req, res) => {
    const id = req.params.id
    Cake.findById(id)
        .then(cake => {
            res.status(200).json({cake: cake})
        })
        .catch(console.error)
})

//////update///////
app.put("/cakes/:id", (req,res) => {
    const id = req.params.id
    Cake.findByIdAndUpdate(id, req.body, {new:true})
    .then(cake => {
        console.log("The cake that was updated: ", cake)
        res.sendStatus(204)
    })
    .catch(console.error)
})

//////delete//////
app.delete("/cakes/:id", (req,res) => {
    const id = req.params.id
    Cake.findByIdAndRemove(id)
    .then(cake => {
        console.log("The cake that was deleted: ", cake)
        res.sendStatus(204)
    })
    .catch(err => res.json(err))
})




/////Server Listener///////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))