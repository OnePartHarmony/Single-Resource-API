const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

const router = express.Router()

//////user signup//////
router.post("/signup", async (req,res) => {
    console.log("This is the body input for signup: ", req.body)
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    User.create(req.body)
        .then(user => {
            res.status(201).json({username: user.username})
        })
        .catch(error => {
            console.error(error)
            res.json(error)
        })
})

////////login route///////////
router.post("/login", async (req,res) => {
    const {username, password} = req.body
    User.findOne({username})
        .then(async (user) => {
            if (user) {
                const passwordMatches = await bcrypt.compare(password, user.password)
                if (passwordMatches) {
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id

                    console.log("this is req.session: ", req.session)

                    res.status(201).json({user: user.toObject()})
                } else {
                    res.json({error: "password incorrect"})
                }
            } else {
                res.json({error: "user doesn't exist"})
            }
        })
        .catch(err => {
            console.error(err)
            res.json(err)
        })
})


/////////logout route/////////////
router.delete("/logout", (req, res) => {
    req.session.destroy(err => {
        console.log("session after logout: ", req.session)
        console.log("error on logout?", err)
        res.sendStatus(204)
    })
})


module.exports = router