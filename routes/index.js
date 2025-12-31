const express = require("express");
const mongoose = require("mongoose");
const Articles = require("../models/articles");
const { scraping } = require("../services/main");

// working with express
const app = express();
const PORT = 2500;
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
        // saving the articles
        const articles = await scraping();
        for (const item of articles) {
            await Articles.findOneAndUpdate(
                { url: item.url }, // unique thing URL as filter
                item, // item to add
                {
                    upsert: true, // crate if doesn't exist
                    new: true, // update document
                }
            );
            console.log(item.title);
        }

        // working with express
        app.get("/api/articles", async (req, res) => {
            const allArticles = await Articles.find();
            res.json(allArticles);
        });

        // read logic
        app.get("/articles", async (req, res) => {
            try {
                // fetching from the MongoDB
                const data = await Articles.find();
                // showing success
                res.status(200).json(data);
            } catch (err) {
                // showing error
                res.status(500).json({
                    messege: "Error fetching articles",
                    error: err,
                });
            }
        });

        // deleting the article
        app.delete("/articles:id", async (req, res) => {
            try {
                // fetching and deleting the article by unique Id created by mongoDB
                const deleted = await Articles.findByIdAndDelete();
                if (!deleted)
                    return res
                        .status(404)
                        .json({ messege: "Article not found" });
                res.status(200).json({ messege: "Deleted Successfully!" });
            } catch (err) {
                res.status(500).json({
                    messege: "Error deleting articles",
                    error: err,
                });
            }
        });

        // updating the data
        app.put("/articles:id", async (req, res) => {
            try {
                const data = await Articles.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }
                );

                if (!data)
                    return res
                        .status(404)
                        .json({ messege: "Article not found!" });
                res.status(200).json({
                    messege: "Article updated successfully!",
                });
            } catch (err) {
                res.status(500).json({
                    messege: "Error updating article",
                    error: err,
                });
            }
        });
        // initializing the server
        app.listen(PORT, () => {
            console.log(
                "server is running on port: " + `http://localhost:${PORT}`
            );
        });
    } catch (err) {
        console.error(err);
    }
};

connectAndSave();
