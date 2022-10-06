//run this script with "npm run seed-breads"

const mongoose = require("../utility/connection")
const Bread = require("../models/bread")

const db = mongoose.connection

db.on("open", () => {
    const starterBread= [
        { name: "sourdough", isYeasted: false, isVegan: true, available: [{day: "Wednesday", startHour: 6}, {day: "Thursday", startHour: 6}, {day: "Friday", startHour: 6}, {day: "Saturday", startHour: 6}, {day: "Sunday", startHour: 6}]},
        { name: "seeded", isYeasted: false, isVegan: true, available: [{day: "Wednesday", startHour: 6}, {day: "Thursday", startHour: 6}, {day: "Friday", startHour: 6}]},
        { name: "challah", isYeasted: true, isVegan: false, available: [{day: "Friday", startHour: 10}]},
        { name: "pain de mie", isYeasted: true, isVegan: false, available: [{day: "Thursday", startHour: 8}, {day: "Friday", startHour: 8}, {day: "Saturday", startHour: 8}, {day: "Sunday", startHour: 8}]}
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
