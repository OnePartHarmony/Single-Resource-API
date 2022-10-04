//run this script with "npm run seed"

const mongoose = require("../models/connection")
const Cake = require("../models/cakes")

const db = mongoose.connection

db.on("open", () => {
    const starterCakes = [
        { name: "wacky", frosting: "chocolate", diameter: 8, layers: 1, hasFilling: false },
        { name: "harvey wallbanger", frosting: "glaze", diameter: 10, hasFilling: false },
        { name: "boston cream pie", frosting: "ganache", diameter: 8, layers: 2, hasFilling: true },
        { name: "red velvet", frosting: "cream cheese", diameter: 9, layers: 2, hasFilling: false },
        { name: "black and white", frosting: "buttercream", diameter: 8, layers: 2, hasFilling: true },
        { name: "carrot", frosting: "cream cheese", diameter: 9, layers: 2, hasFilling: false },
    ]

    Cake.deleteMany({})
        .then(() => {
            Cake.create(starterCakes)
                .then(data => {
                    console.log("database seeded with these cakes: ", data)
                    db.close()
                })
            .catch(err => {
                console.error(err)
                db.close()
            })
        })
        .catch(err => {
            console.error(err)
            db.close()
        })
})

