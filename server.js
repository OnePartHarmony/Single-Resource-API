require("dotenv").config()
const express = require("express")
const path = require("path")

const CakeRouter = require("./controllers/cakes")
const BreadRouter = require("./controllers/bread")
const UserRouter = require("./controllers/user")
// const CommentRouter = require("./controllers/comment")
const middleware = require("./utility/middleware")

////express application object////////
const app = express()

//////Middleware/////
middleware(app)


//////Home Route//////////
app.get("/", (req,res) => {
    res.send("The server is running.  Nothing on the homepage yet")
})


/////Register Routes///////
app.use("/cakes", CakeRouter)
app.use("/bread", BreadRouter)
app.use("/user", UserRouter)
// app.use("/comments", CommentRouter)


/////Server Listener///////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))