// importing mongoose
const mongoose = require("mongoose");

// defining schema, a blueprint for the database
const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    datetime: { type: Date, required: true },
    processed: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("Articles", articleSchema);
