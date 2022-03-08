const mongoose = require("mongoose");


const memberSchema = new mongoose.Schema({
    first_name: {
        type: String,
        nullable: false,
        required: true
    },
    last_name: {
        type: String,
        nullable: false,
        required: true
    },
    email: {
        type: String,
        unique: true,
        nullable: false,
        trim: true,
        required: true
    },
    department: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("member", memberSchema);