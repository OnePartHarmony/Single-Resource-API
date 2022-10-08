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
        res.redirect(`/error?error=log%20in%20to%20comment`)
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
                    .catch(err => res.redirect(`/error?error=${err}`))
            } else {
                cake.comments.push(req.body)
                cake.save()
                res.status(200).json({cake: cake})
            }
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


/////delete comment route- only useable by author of comment////
router.delete("/:cakeOrBreadId/:commentId", (req,res) => {
    const goodsId = req.params.cakeOrBreadId
    const commentId = req.params.commentId
    Cake.findById(goodsId)
        .then(cake => {
            if (!req.session.loggedIn) {
                res.redirect(`/error?error=log%20in%20to%20delete%20or%20create%20comment`)
            } else if (cake == null) {
                Bread.findById(goodsId)
                .then(bread => {
                    const breadComment = bread.comments.id(commentId)
                    if (breadComment.author == req.session.userId) {
                        breadComment.remove()
                        res.status(200).json({bread: bread})
                        return bread.save()
                    } else {
                        res.redirect(`/error?error=comment%20may%20only%20be%20deleted%20by%20its%20creator`)
                    }
                })
                .catch(err => res.redirect(`/error?error=${err}`))
            } else {
                const cakeComment = cake.comments.id(commentId)
                if (cakeComment.author == req.session.userId) {
                    cakeComment.remove()
                    res.status(200).json({cake: cake})
                    return cake.save()
                } else {
                    res.redirect(`/error?error=comment%20may%20only%20be%20deleted%20by%20its%20creator`)
                }
            }
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})



////Export Routes////////
module.exports = router