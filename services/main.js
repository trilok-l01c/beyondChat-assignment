const Articles = require("../models/articles.js");
const { rewriteArticles } = require("./llmService");
const { getResults } = require("./searchService");
const { extractContent } = require("./otherScraper");

const runDeepResearch = async () => {
    const article = await Articles.findOne({ processed: { $ne: true } });
    // if article not exist means already processed
    if (!article) return console.log("All are processed");
    console.log("Searching for the better");

    const links = await getResults(article.title);
    const researchSamples = [];
    for (const link of links) {
        const text = await extractContent(link);
        if (text && text.length > 500) {
            console.log("push this site");
            researchSamples.push({ url, content: text.substring(0, 8000) });
        } else {
            console.log("skip this site");
        }
    }
    if (researchSamples.length > 0) {
        // calling GPT
        console.log("Trigger GPT-5-nano");
        const finalArticle = rewriteArticles(article.content, researchSamples);
        if (finalArticle) {
            article.content = finalArticle;
            article.processed = true;
            await article.save();
            console.log("Success!!!");
        }
    } else {
        console.log("Increase number of sites");
    }
};

module.exports = { runDeepResearch };
