//////dependencies/////
const express = require("express")
const Cake = require("../models/cakes")
const Bread = require("../models/bread")



/////Routes//////////

////post comment route - can only be done when logged in/////
// router.post("/:cakeOrBreadId", (req,res) => {
//     const id = req.params.cakeOrBreadId
//     if (req.session.loggedIn) {
//         req.body.author = req.session.userId
//     } else {
//         res.sendStatus(401)
//         return
//     }
//     Cake.findById(id)
//         .then(cake => )
// })




////Export Routes////////
module.exports = router