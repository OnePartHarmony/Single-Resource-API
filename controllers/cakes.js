////dependencies////
const express = require("express")
const Cake = require("../models/cakes")

/////router////
const router = express.Router()

////////////ROUTES//////


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
    req.body.owner = req.session.userId
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
    Cake.findById(id)
    .then(cake => {
        if (cake.owner == req.session.userId) {
           res.sendStatus(204)
           return cake.deleteOne()
        } else {
            res.sendStatus(401)
        }        
    })
    .catch(err => res.json(err))
})



////export router//////
module.exports = router