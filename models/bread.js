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

const breadSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        set: capitalizeValue
    },
    isYeasted: {
        type: Boolean,
        required: true
    },
    isVegan: {
        type: Boolean,
        required: true
    },
    specialIngredients : {
        type: String,
        required: true,
        set: lowerCaseValue
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // available: [daysSchema],
    comments: [commentSchema]
}, {timestamps: true})

const Bread = model("Bread", breadSchema)

module.exports = Bread