const mongoose = require("../utility/connection")
const commentSchema = require("../schema/comment")
// const daysSchema = require("../schema/days")

const {Schema, model} = mongoose

const lowerCaseValue = function (str) {
    return str.toLowerCase()
}

const breadSchema = new Schema({
    name: {
        type: String,
        required: true,
        set: lowerCaseValue
    },
    isYeasted: {
        type: Boolean,
        required: true
    },
    isVegan: {
        type: Boolean,
        required: true
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