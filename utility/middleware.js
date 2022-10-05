/////dependencies//////
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const session = require("express-session")
const MongoStore = require("connect-mongo")



///////Middleware Function//////
const middleware = (app) => {
    app.use(morgan("tiny"))
    app.use(express.urlencoded({extended:true}))
    app.use(express.static("public"))
    app.use(express.json())
    app.use(
        session({
            secret: process.env.SECRET,
            store: MongoStore.create({
                mongoUrl: process.env.DATABASE_URL
            }),
            saveUninitialized: true,
            resave: false
        })
    )
}


module.exports = middleware