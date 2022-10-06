const mongoose = require("../utility/connection")

const {Schema} = mongoose

const daysSchema = new Schema({
    day: {
        type: String,
        required: true,
        enum: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    startHour: {
        type: Number,
        required: false,
        enum: [6, 7, 8, 9, 10, 11, 12, 13, 14]
    }
})

module.exports = daysSchema