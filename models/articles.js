// importing mongoose
const mongoose = require("mongoose");

// defining schema, a blueprint for the data base
const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    datetime: { type: String, required: true },
    processed: { type: Boolean, required: true },
});

module.exports = mongoose.model("Articles", articleSchema);
