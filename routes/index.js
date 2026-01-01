// accessing the .env
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const mongoose = require("mongoose");
const Articles = require("../models/articles");
const { scraping } = require("../services/baseScraper");
const { getResults } = require("../services/searchService");
const { runDeepResearch } = require("../services/main");

// taking mongo's connection string
const MongoURI = process.env.MONGO_URI;
// working with express
const app = express();
// middleware
app.use(express.json());
const PORT = process.env.PORT;
// accessing the database
const connectAndSave = async () => {
    try {
        // returns nothing
        await mongoose.connect(MongoURI);
        // CREATE Logic: POST
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
        // READ Logic: GET route
        app.get("/articles/", async (req, res) => {
            try {
                // fetching from the MongoDB
                const data = await Articles.find({});
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

        app.get("/articles/:id", async (req, res) => {
            try {
                const data = await Articles.findById(req.params.id);
                if (!data)
                    return res.status(404).json({ messege: "File not found!" });
                res.status(200).json(data);
            } catch (err) {
                res.status(500).json({
                    messege: "Error finding article",
                    error: err,
                });
            }
        });
        // deleting the article
        app.delete("/articles/:id", async (req, res) => {
            try {
                // fetching and deleting the article by unique Id created by mongoDB
                const deleted = await Articles.findByIdAndDelete(req.params.id);
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
        app.put("/articles/:id", async (req, res) => {
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
                "server is running on port: " +
                    `http://localhost:${PORT}/articles`
            );
        });
        // calling for the deep research
        runDeepResearch();
    } catch (err) {
        console.error(err);
    }
};

connectAndSave();

const researchArticles = async () => {
    const article = await Articles.findOne({ processed: { $ne: true } });
    if (article) {
        console.log(`search for competitors for: ${article.title}`);
        const competitors = getResults(article.title);
        console.log(`Found competitors ${competitors}`);
    }
};
