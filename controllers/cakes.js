////dependencies////
const express = require("express")
const Cake = require("../models/cakes")

/////router////
const router = express.Router()

////////////ROUTES//////


/////index/////
router.get("/", (req,res) => {
    Cake.find({})
        // .populate("owner", "username")
        // .populate("comments.author", "username")
        .then(cakes => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            const goodsList = ["cakes"]
            const whoseIndex = "All"
            res.render("menu", {cakes, username, loggedIn, userId, whoseIndex, goodsList})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
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
        .catch(err => res.redirect(`/error?error=${err}`))
})

/////index route for user-owned cakes/////
// router.get("/mine", (req,res) => {
//     Cake.find({owner: req.session.userId})
//         // .populate("owner", "username")
//         // .populate("comments.author", "username")
//         .then(cakes => {
//             const username = req.session.username
//             const loggedIn = req.session.loggedIn
//             const userId = req.session.userId
//             const goodsList = ["cakes"]
//             const whoseIndex = "Your"
//             res.render("menu", {cakes, username, loggedIn, userId, whoseIndex, goodsList})
//         })
//         .catch(err => res.redirect(`/error?error=${err}`))
// })

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
        .catch(err => res.redirect(`/error?error=${err}`))
})


router.get("/edit/:name", (req,res) => {
    const name = req.params.name
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId 
    Cake.findOne({name: {$eq: name}})
        .then (cake => {
            res.render("cakes/edit", {cake, username, loggedIn, userId})
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })

})

//////update///////
router.put("/:name", (req, res) => {
    const name = req.params.name
    req.body.hasFilling = req.body.hasFilling == "on" ? true : false 
    Cake.findOne({name: {$eq: name}})
        .then(cake => {
            if (cake.owner == req.session.userId) {
               return cake.updateOne(req.body)
            } else {
                res.redirect("/error?error=cake%20may%20only%20be%20edited%20by%20its%20creator")
            }            
        })
        .then(() => {
            res.redirect(`/cakes/${name}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

//////delete//////
router.delete("/:name", (req, res) => {
    const name = req.params.name
    Cake.findOne({name: {$eq: name}})
        .then(cake => {
            if (cake.owner == req.session.userId) {
                cake.deleteOne()
                res.redirect("/cakes")
            } else {
                res.redirect("/error?error=cake%20may%20only%20be%20deleted%20by%20its%20creator")
            }            
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


////export router//////
module.exports = router