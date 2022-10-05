const mongoose = require("./connection")
const commentSchema = require("./comment")

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
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [commentSchema]
}, {timestamps: true})

const Bread = model("Bread", breadSchema)

module.exports = Bread