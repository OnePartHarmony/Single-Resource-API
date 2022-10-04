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






module.exports = router