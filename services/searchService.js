const axios = require("axios");
require("dotenv").config();

// getting filtered results from google
const getResults = async (title) => {
    const apiKey = process.env.SerpApiKey;
    try {
        // fetching HTML from the google searches
        const response = await axios.get("https://serpapi.com/search", {
            params: {
                q: `${title} blog article`, // title to search
                api_key: apiKey,
                engine: "google", // search engine
                num: 25, // number of results to search for
            },
        });
        // to avoid ads
        const results = await response.data.organic_results;

        // filtering results
        const filteredRes = results
            .map((res) => res.link)
            .filter((link) => {
                const isValid =
                    /youtube|facebook|twitter|x|beyondchats|ebay|etsy|reddit|instagram|linkedin|amazon|pinterest/.test(
                        link
                    );
                const isFile = link.endsWith(".pdf") || link.endsWith(".docx");
                return !isValid && !isFile;
            });
        // return the top two valid results
        return filteredRes;
    } catch (error) {
        console.error("SerpApi error:", error.response?.data || error.messege);
        return [];
    }
};

module.exports = { getResults };
