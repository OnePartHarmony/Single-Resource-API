const mongoose = require("../utility/connection")
const commentSchema = require("../schema/comment")
const daysSchema = require("../schema/days")

const {Schema, model} = mongoose

const lowerCaseValue = function (str) {
    return str.toLowerCase()
}

const cakeSchema = new Schema({
    name: {
        type: String,
        required: true,
        set: lowerCaseValue
    },
    frosting: {
        type: String,
        required: true,
        enum: ["buttercream", "cream cheese", "chocolate", "glaze", "ganache", "none"],
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
    available: [daysSchema],
    comments: [commentSchema]
}, {timestamps: true})

const Cake = model("Cake", cakeSchema)

module.exports = Cake