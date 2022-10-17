require("dotenv").config()
const express = require("express")
// const path = require("path")

const CakeRouter = require("./controllers/cakes")
const BreadRouter = require("./controllers/bread")
const UserRouter = require("./controllers/user")
const CommentRouter = require("./controllers/comment")
const middleware = require("./utility/middleware")

const Cake = require("./models/cakes")
const Bread = require("./models/bread")
////express application object////////
const app = require("liquid-express-views")(express())

//////Middleware/////
middleware(app)


//////Home Route//////////
app.get("/", (req,res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    res.render("index.liquid", {username, loggedIn, userId})
})

/////Menu Route//////
app.get("/menu", (req,res) => {
    Cake.find({})
        .then(cakes => {
                const username = req.session.username
                const loggedIn = req.session.loggedIn
                const userId = req.session.userId
                const goodsList = ["breads", "cakes"]
                const whoseIndex = "All"
                Bread.find({})
                    .then(breads => {
                       res.render("menu", {cakes, breads, username, loggedIn, userId, whoseIndex, goodsList}) 
                    })
                    .catch(err => res.redirect(`/error?error=${err}`))
            })
            .catch(err => res.redirect(`/error?error=${err}`))
})

/////User-created items route//////
app.get("/mine", (req,res) => {
    Cake.find({owner: req.session.userId})
        .then(cakes => {
                const username = req.session.username
                const loggedIn = req.session.loggedIn
                const userId = req.session.userId
                const goodsList = ["breads", "cakes"]
                const whoseIndex = "Your"
                Bread.find({owner: req.session.userId})
                    .then(breads => {
                       res.render("menu", {cakes, breads, username, loggedIn, userId, whoseIndex, goodsList}) 
                    })
                    .catch(err => res.redirect(`/error?error=${err}`))
            })
            .catch(err => res.redirect(`/error?error=${err}`))
})



/////Register Routes///////
app.use("/cakes", CakeRouter)
app.use("/breads", BreadRouter)
app.use("/user", UserRouter)
app.use("/comments", CommentRouter)


//////error route/////////
app.get("/error", (req,res) => {
    // const username = req.session.username
    // const loggedIn = req.session.loggedIn
    // const userId = req.session.userId
    const {username, loggedIn, userId} = req.session
    const error = req.query.error || "This page does not exist"
    res.render("error.liquid", {error, username, loggedIn, userId})
})


//////catch-all route for non-existent paths/////
app.all("*", (req,res) => {
    res.redirect("/error")
})


/////Server Listener///////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))