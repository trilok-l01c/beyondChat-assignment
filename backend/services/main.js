const Articles = require("../models/articles.js");
const { rewriteArticles } = require("./llmService");
const { getResults } = require("./searchService");
const { extractContent } = require("./otherScraper");

const runDeepResearch = async () => {
    console.time("Phase 2 executions");
    const article = await Articles.findOne({ processed: { $ne: true } });
    if (!article) return console.log("All are processed");
    const links = await getResults(article.title);
    const researchSamples = [];

    for (const link of links) {
        const text = await extractContent(link);
        if (text && text.length > 500) {
            console.log("push this site");
            researchSamples.push({
                url: link,
                content: text.substring(0, 8000),
            });
            if (researchSamples.length >= 2) break;
        }
    }

    if (researchSamples.length > 0) {
        try {
            const finalArticle = await rewriteArticles(
                article.content,
                researchSamples
            );
            if (finalArticle.length > 500) {
                article.content = finalArticle;
                article.processed = true;
                await article.save();
                console.log("Success!!!");
                console.log("Raw llm output: \n", finalArticle);
            } else {
                console.log("LLM failure");
                if (finalArticle)
                    console.log("actually returned: ", finalArticle, "...");
            }
        } catch (error) {
            console.error("LLM failed:", error.message);
        }
    } else {
        console.log("No good samples found");
    }
    console.timeEnd("Phase 2 executions");
};

module.exports = { runDeepResearch };
