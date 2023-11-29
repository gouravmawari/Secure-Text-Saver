const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    Text: {
        type: String
    }
});

const projectSchema = mongoose.model("inter_Project", userSchema);
module.exports = projectSchema;
