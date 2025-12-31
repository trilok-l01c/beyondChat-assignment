const express = require("express");
const mongoose = require("mongoose");
const Articles = require("./articles");
const { scraping } = require("./main");

// working with express
const app = express();
const PORT = 3000;

// accessing the database
const connectAndSave = async () => {
    try {
        // returns nothing
        await mongoose.connect(
            // password should be alphanumeric
            "mongodb+srv://trilokl01c:glQwBajNsqOrZYUu@first.muygxfz.mongodb.net/beyond_chats?appName=first"
            //                        ^^^^^^^^^^^^^^^^                           ^^^^^^^^^^^  ^^^^^^^^^^^^^^
            //                         password                                Datebase name | cluster name
        );

        const articles = await scraping();

        for (const item of articles) {
            await Articles.create(item);
            console.log(item.title);
        }

        // working with express
        app.get("api/articles", async (req, res) => {
            const allArticles = await Articles.find();
            res.json(allArticles);
        });

        app.listen(PORT, () => {
            console.log("server is running on port: " + PORT);
        });
    } catch (err) {
        console.error(err);
    }
};

connectAndSave();
