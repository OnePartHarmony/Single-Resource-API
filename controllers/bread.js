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
            const whoseIndex = "All"
            res.render("breads/index", {breads, username, loggedIn, userId, whoseIndex})
        })
        .catch(console.error)
})


router.get("/new", (req,res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    res.render("breads/new", {username, loggedIn, userId})
})

/////create/////
router.post("/", (req,res) => {
    req.body.owner = req.session.userId
    req.body.isVegan = req.body.isVegan === "on" ? true : false
    req.body.isYeasted = req.body.isYeasted === "on" ? true : false
    Bread.create(req.body)
        .then(bread => {
            res.redirect("/breads")
        })
        .catch(console.error)
})

/////index route for user-owned breads/////
router.get("/mine", (req,res) => {
    Bread.find({owner: req.session.userId})
        // .populate("owner", "username")
        // .populate("comments.author", "username")
        .then(breads => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            const whoseIndex = "Your"
            res.render("breads/index", {breads, username, loggedIn, userId, whoseIndex})
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



router.get("/edit/:name", (req,res) => {
    const name = req.params.name
    Bread.findOne({name: {$eq: name}})
        .then (bread => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.render("breads/edit", {bread, username, loggedIn, userId})
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
})

//////update///////
router.put("/:name", (req, res) => {
    const name = req.params.name
    req.body.isYeasted =req.body.isYeasted == "on" ? true : false
    req.body.isVegan = req.body.isVegan == "on" ? true : false
    Bread.findOne({name: {$eq: name}})
        .then(bread => {
            if (bread.owner == req.session.userId) {
               return bread.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }            
        })
        .then(() => {
            res.redirect(`/breads/${name}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

//////delete//////
router.delete("/:name", (req, res) => {
    const name = req.params.name
    Bread.findOne({name: {$eq: name}})
    .then(bread => {
        bread.deleteOne()
        res.redirect("/breads")
    })
    .catch(err => res.redirect(`/error?error=${err}`))
})




////export router//////
module.exports = router