//run this script with "npm run seed-breads"

const mongoose = require("../utility/connection")
const Bread = require("../models/bread")

const db = mongoose.connection

db.on("open", () => {
    const starterBread= [
        { name: "Sourdough", isYeasted: false, isVegan: true, specialIngredients: "whole-grain flour", price: 7
        //  available: [{day: "Wednesday", startHour: 6}, {day: "Thursday", startHour: 6}, {day: "Friday", startHour: 6}, {day: "Saturday", startHour: 6}, {day: "Sunday", startHour: 6}]
        },
        { name: "Seeded Sourdough", isYeasted: false, isVegan: true, specialIngredients: "sesame, pumpkin, and sunflower seeds", price: 8
        //  available: [{day: "Wednesday", startHour: 6}, {day: "Thursday", startHour: 6}, {day: "Friday", startHour: 6}]
        },
        { name: "Challah", isYeasted: true, isVegan: false, specialIngredients: "eggs", price: 9
        //  available: [{day: "Friday", startHour: 10}]
        },
        { name: "Pain de Mie", isYeasted: true, isVegan: false, specialIngredients: "milk and butter", price: 8
        //  available: [{day: "Thursday", startHour: 8}, {day: "Friday", startHour: 8}, {day: "Saturday", startHour: 8}, {day: "Sunday", startHour: 8}]
        }
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
