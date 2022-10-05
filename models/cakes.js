const mongoose = require("./connection")

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
    diameter: {
        type: Number,
        required: true
    },
    layers: {
        type: Number,
        required: false
    },
    hasFilling: {
        type: Boolean,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Cake = model("Cake", cakeSchema)

module.exports = Cake