const axios = require("axios");
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

const extractContent = async (url, retryCount = 0) => {
    const header = {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Ch-Ua":
            '"Not_A Brand";v="8", "Chromium";v="121", "Google Chrome";v="121"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
    };
    try {
        const content = await axios.get(url, {
            timeout: 15000,
            header, // pretending to be a browser
        });

        // make virtual DOM
        const data = content.data;
        const dom = new JSDOM(data, { url });
        // let the readability find the dom of article
        const reader = new Readability(dom.window.document);
        const article = reader.parse();
        const text = article
            ? article.textContent.trim()
            : "could not extract content";
        // returning article
        return text.length > 500 ? text : null;
    } catch (error) {
        const errorMsg = error.response
            ? `Status: ${error.response.status}`
            : error.message;
        console.error(`❌ Scrape Failed: ${url} | ${errorMsg}`);
        if (retryCount < 2 && error.response?.status === 403) {
            await new Promise((r) => setTimeout(r, 3000));
            return extractContent(url, retryCount + 1);
        }
        return null;
    }
};

module.exports = { extractContent };
