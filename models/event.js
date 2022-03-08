const mongoose = require("mongoose");
const User = require("./user")

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        nullable: false,
        trim: true
    },
    description: {
        type: String,
        nullable: false,
        trim: true
    },
    application_deadline: {
        type: Date
    },
    application_link: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("event", eventSchema);