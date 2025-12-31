// using these two to get HTML and scraping data from it.
const axios = require("axios");
const cheerio = require("cheerio");
const DBFile = require("./articles"); // importing the DB file

// storing all the articles, only two for now
let pages = [
    "https://beyondchats.com/blogs/page/15/",
    "https://beyondchats.com/blogs/page/14/",
];
const articles = [];
// get the data from the beyondChat's blog page
const scrapePages = async (url) => {
    // calling load on cheerio
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const $articles = $("article.entry-card");
        // scraping
        $articles.each((idx, el) => {
            // taking titles and links
            const obj = {};
            const $a = $(el).find("h2.entry-title a");
            obj.title = $($a).text();
            obj.url = $($a).attr("href");
            // taking dates
            const $d = $(el).find("time");
            obj.datetime = $($d).attr("datetime");
            articles.push(obj);
        });
    } catch (err) {
        console.error(err);
    }
};

// iterating for every page
const scraping = async () => {
    for (const page of pages) {
        await scrapePages(page);
    }
    // as per requirement only taking 5 articles
    const lastFiveArticles = articles.slice(0, 5);
    return lastFiveArticles;
};

// exporting the scraping function
module.exports = { scraping };
