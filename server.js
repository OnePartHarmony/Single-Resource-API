require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require("path")

const CakeRouter = require("./controllers/cakes")

////express application object////////
const app = express()

//////Middleware/////
app.use(morgan("tiny"))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(express.json())



//////Home Route//////////
app.get("/", (req,res) => {
    res.send("The server is running.  Nothing on the homepage yet")
})


/////Register Routes///////
app.use("/cakes", CakeRouter)




/////Server Listener///////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))