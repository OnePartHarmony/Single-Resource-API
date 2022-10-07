////dependencies////
const express = require("express")
const Cake = require("../models/cakes")

/////router////
const router = express.Router()

////////////ROUTES//////


/////index/////
router.get("/", (req,res) => {
    Cake.find({})
        .populate("owner", "username")
        .populate("comments.author", "username")
        .then(cakes => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            const whoseIndex = "All"
            res.render("cakes/index", {cakes, username, loggedIn, userId, whoseIndex})
        })
        .catch(console.error)
})


router.get("/new", (req,res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    res.render("cakes/new", {username, loggedIn, userId})
})

/////create/////
router.post("/", (req,res) => {
    req.body.owner = req.session.userId
    req.body.hasFilling = req.body.hasFilling === "on" ? true : false
    Cake.create(req.body)
        .then(cake => {
            res.redirect("/cakes")
        })
        .catch(console.error)
})

/////index route for user-owned cakes/////
router.get("/mine", (req,res) => {
    Cake.find({owner: req.session.userId})
        .populate("owner", "username")
        .populate("comments.author", "username")
        .then(cakes => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            const whoseIndex = "Your"
            res.render("cakes/index", {cakes, username, loggedIn, userId, whoseIndex})
        })
        .catch(error => res.json(error))
})

/////show/////
router.get("/:name", (req, res) => {
    const name = req.params.name
    Cake.findOne({name: {$eq: name}})
        .populate("owner", "username")
        .populate("comments.author", "username")
        .then(cake => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.render('cakes/show', { cake, username, loggedIn, userId })
        })
        .catch(console.error)
})


router.get("/edit/:name", (req,res) => {
    const name = req.params.name
    Cake.findOne({name: {$eq: name}})
        .then (cake => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.render("/cakes/edit", {cake, username, loggedIn, userId})
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })

})

//////update///////
router.put("/:name", (req, res) => {
    const name = req.params.name
    Cake.findOne({name: {$eq: name}})
        .then(cake => {
            if (cake.owner == req.session.userId) {
               res.sendStatus(204)
               return cake.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }            
        })
        .catch(err => res.json(err))
})

//////delete//////
router.delete("/:name", (req, res) => {
    const name = req.params.name
    Cake.findOne({name: {$eq: name}})
    .then(cake => {
        cake.deleteOne()
        res.redirect("/cakes")
    })
    .catch(err => res.json(err))
})



////export router//////
module.exports = router