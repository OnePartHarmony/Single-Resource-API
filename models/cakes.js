const mongoose = require("../utility/connection")
const commentSchema = require("../schema/comment")
// const daysSchema = require("../schema/days")

const {Schema, model} = mongoose

const lowerCaseValue = (string) => {
    return string.toLowerCase()
}

const capitalizeValue = (string) => {
    const wordsArray = string.split(" ")
    const capitalString = wordsArray.map(word => {
        return word[0].toUpperCase() + word.substring(1)
    }).join(" ")
    return capitalString
}

const cakeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        set: capitalizeValue
    },
    sponge: {
        type: String,
        required: true,
        set: lowerCaseValue
    },
    frosting: {
        type: String,
        required: true,
        enum: ["vanilla buttercream", "cream cheese frosting", "chocolate frosting", "glaze", "ganache", "none"],
        set: lowerCaseValue
    },
    price: {
        type: Number,
        required: true
    },
    hasFilling: {
        type: Boolean,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // available: [daysSchema],
    comments: [commentSchema]
}, {timestamps: true})

const Cake = model("Cake", cakeSchema)

module.exports = Cake