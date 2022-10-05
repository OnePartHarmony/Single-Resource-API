//////dependencies/////
const express = require("express")
const Cake = require("../models/cakes")
const Bread = require("../models/bread")

//////create router///////
const router = express.Router()

/////Routes//////////

////post comment route - can only be done when logged in/////
router.post("/:cakeOrBreadId", (req,res) => {
    const id = req.params.cakeOrBreadId
    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
        return
    }
    Cake.findById(id)
        .then(cake => {
            if (cake == null) {
                Bread.findById(id)
                    .then(bread => {
                        bread.comments.push(req.body)
                        bread.save()
                        res.status(200).json({bread: bread})
                    })
                    .catch(error => console.error(error))
            } else {
                cake.comments.push(req.body)
                cake.save()
                res.status(200).json({cake: cake})
            }
        })
        .catch(error => console.error(error))
})




////Export Routes////////
module.exports = router