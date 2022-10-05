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


/////delete comment route- only useable by author of comment////
router.delete("/:cakeOrBreadId/:commentId", (req,res) => {
    const goodsId = req.params.cakeOrBreadId
    const commentId = req.params.commentId
    Cake.findById(goodsId)
        .then(cake => {
            if (!req.session.loggedIn) {
                res.sendStatus(401)
            } else if (cake == null) {
                Bread.findById(goodsId)
                .then(bread => {
                    const breadComment = bread.comments.id(commentId)
                    if (breadComment.author == req.session.userId) {
                        breadComment.remove()
                        res.status(200).json({bread: bread})
                        return bread.save()
                    } else {
                        res.sendStatus(401)
                    }
                })
                .catch(error => console.error(error))
            } else {
                const cakeComment = cake.comments.id(commentId)
                if (cakeComment.author == req.session.userId) {
                    cakeComment.remove()
                    res.status(200).json({cake: cake})
                    return cake.save()
                } else {
                    res.sendStatus(401)
                }
            }
        })
        .catch(error => console.error(error))
})









////Export Routes////////
module.exports = router