////dependencies////
const express = require("express")
const Cake = require("../models/cakes")

/////router////
const router = express.Router()

////////////ROUTES//////

/////seed////
router.get("/seed", (req, res) => {
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
router.get("/", (req,res) => {
    Cake.find({})
        .then(cakes => {
            res.json({cakes: cakes})
        })
        .catch(console.error)
})

/////create/////
router.post("/", (req,res) => {
    Cake.create(req.body)
        .then(cake => {
            res.status(201).json({cake: cake.toObject()})
        })
        .catch(console.error)
})

/////show/////
router.get("/:id", (req, res) => {
    const id = req.params.id
    Cake.findById(id)
        .then(cake => {
            res.status(200).json({cake: cake})
        })
        .catch(console.error)
})

//////update///////
router.put("/:id", (req,res) => {
    const id = req.params.id
    Cake.findByIdAndUpdate(id, req.body, {new:true})
    .then(cake => {
        console.log("The cake that was updated: ", cake)
        res.sendStatus(204)
    })
    .catch(console.error)
})

//////delete//////
router.delete("/:id", (req,res) => {
    const id = req.params.id
    Cake.findByIdAndRemove(id)
    .then(cake => {
        console.log("The cake that was deleted: ", cake)
        res.sendStatus(204)
    })
    .catch(err => res.json(err))
})



////export router//////
module.exports = router