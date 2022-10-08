//run this script with "npm run seed-cakes"

const mongoose = require("../utility/connection")
const Cake = require("../models/cakes")

const db = mongoose.connection

db.on("open", () => {
    const starterCakes = [
        { name: "Wacky", sponge: "chocolate", frosting: "chocolate frosting", price: 25, hasFilling: false
        //  available: [{day: "Wednesday", startHour: 9}, {day: "Thursday", startHour: 6}, {day: "Friday", startHour: 6}, {day: "Saturday", startHour: 6}, {day: "Sunday", startHour: 6}] 
        },
        { name: "Harvey Wallbanger", sponge: "orange and galliano", frosting: "glaze", price: 30, hasFilling: false
        //  available: [{day: "Friday", startHour: 12}, {day: "Saturday", startHour: 9}, { day: "Sunday", startHour: 9}] 
        },
        { name: "Red Velvet", sponge: "red velvet", frosting: "cream cheese frosting", price: 35, hasFilling: false
        //  available: [{day: "Sunday", startHour: 7}] 
        },
        { name: "Black and White", sponge: "dark chocolate", frosting: "vanilla buttercream", price: 40, hasFilling: true
        //  available: [{day: "Saturday", startHour: 9}, {day: "Sunday", startHour: 7}] 
        },
        { name: "Carrot", sponge: "carrot", frosting: "cream cheese frosting", price: 35, hasFilling: false
        //available: [{day: "Wednesday", startHour: 12}, {day: "Thursday", startHour: 6}, {day: "Friday", startHour: 6}] 
        }
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

