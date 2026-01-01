const axios = require("axios");
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

const extractContent = async (url) => {
    try {
        const content = await axios.get(url, {
            timeout: 15000,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            }, // pretending to be a browser
        });

        // make virtual DOM
        const data = content.data;
        const dom = new JSDOM(content, { url });
        // let the readability find the dom of article
        const reader = new Readability(dom.window.document);
        const article = reader.parse();
        // returning article
        return article
            ? article.textContent.trim()
            : "Could not extract content";
    } catch (error) {
        const errorMsg = error.response
            ? `Status: ${error.response.status}`
            : error.message;
        console.error(`❌ Scrape Failed: ${url} | ${errorMsg}`);
        return null;
    }
};

module.exports = { extractContent };
