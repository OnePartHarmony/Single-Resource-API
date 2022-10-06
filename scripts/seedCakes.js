//run this script with "npm run seed-cakes"

const mongoose = require("../utility/connection")
const Cake = require("../models/cakes")

const db = mongoose.connection

db.on("open", () => {
    const starterCakes = [
        { name: "wacky", frosting: "chocolate", price: 25.00, hasFilling: false, available: [{day: "Wednesday", startHour: 9}, {day: "Thursday", startHour: 6}, {day: "Friday", startHour: 6}, {day: "Saturday", startHour: 6}, {day: "Sunday", startHour: 6}] },
        { name: "harvey wallbanger", frosting: "glaze", price: 30.00, hasFilling: false, available: [{day: "Friday", startHour: 12}, {day: "Saturday", startHour: 9}, { day: "Sunday", startHour: 9}] },
        { name: "red velvet", frosting: "cream cheese", price: 34.50, hasFilling: false, available: [{day: "Sunday", startHour: 7}] },
        { name: "black and white", frosting: "buttercream", price: 40.00, hasFilling: true, available: [{day: "Saturday", startHour: 9}, {day: "Sunday", startHour: 7}] },
        { name: "carrot", frosting: "cream cheese", price: 34.50, hasFilling: false, available: [{day: "Wednesday", startHour: 12}, {day: "Thursday", startHour: 6}, {day: "Friday", startHour: 6}] },
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

