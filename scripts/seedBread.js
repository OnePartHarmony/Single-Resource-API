//run this script with "npm run seed-bread"

const mongoose = require("../models/connection")
const Bread = require("../models/bread")

const db = mongoose.connection

db.on("open", () => {
    const starterBread= [
        { name: "sourdough", isYeasted: false, isVegan: true},
        { name: "seeded", isYeasted: false, isVegan: true},
        { name: "challah", isYeasted: true, isVegan: false},
    ]

    Bread.deleteMany({})
        .then(() => {
            Bread.create(starterBread)
                .then(data => {
                    console.log("database seeded with these breads: ", data)
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
