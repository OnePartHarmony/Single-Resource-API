////dependencies////
const express = require("express")
const Bread = require("../models/bread")

/////router////
const router = express.Router()

////////////ROUTES//////

/////index/////
router.get("/", (req,res) => {
    Bread.find({})
        .populate("owner", "username")
        .populate("comments.author", "username")
        .then(breads => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.render("breads/index", {breads, username, loggedIn, userId})
        })
        .catch(console.error)
})

/////create/////
router.post("/", (req,res) => {
    req.body.owner = req.session.userId
    Bread.create(req.body)
        .then(bread => {
            res.status(201).json({bread: bread.toObject()})
        })
        .catch(console.error)
})

/////index route for user-owned breads/////
router.get("/mine", (req,res) => {
    Bread.find({owner: req.session.userId})
        .populate("owner", "username")
        .populate("comments.author", "username")
        .then(bread => {
            res.status(200).json({bread: bread})
        })
        .catch(error => res.json(error))
})

/////show/////
router.get("/:name", (req, res) => {
    const name = req.params.name
    Bread.findOne({ name: {$eq: name}})
        .populate("owner", "username")
        .populate("comments.author", "username")
        .then(bread => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.render('breads/show', { bread, username, loggedIn, userId })
        })
        .catch(console.error)
})

//////update///////
router.put("/:id", (req,res) => {
    const id = req.params.id
    Bread.findById(id)
        .then(bread => {
            if (bread.owner == req.session.userId) {
               res.sendStatus(204)
               return bread.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }            
        })
        .catch(err => res.json(err))
})

//////delete//////
router.delete("/:id", (req,res) => {
    const id = req.params.id
    Bread.findById(id)
    .then(bread => {
        if (bread.owner == req.session.userId) {
           res.sendStatus(204)
           return bread.deleteOne()
        } else {
            res.sendStatus(401)
        }        
    })
    .catch(err => res.json(err))
})



////export router//////
module.exports = router