// importing mongoose
const mongoose = require("mongoose");
// accessing the database
mongoose
    .connect(
        "mongodb+srv://trilokl01c:<db_password>@first.muygxfz.mongodb.net/?appName=first"
    )
    .then((res) => {
        console.log("Connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });
// defining schema, a blueprint for the data base
const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    datetime: { type: String, required: true },
});

module.exports = mongoose.model("Articles", articleSchema);
