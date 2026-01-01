const axios = require("axios");
require("dotenv").config();

// getting filtered results from google
const getResults = async (title) => {
    const apiKey = process.env.SerpApiKey;
    try {
        // fetching HTML from the google searches
        const response = await axios.get("https://serpapi.com/search", {
            params: {
                q: title, // title to search
                apiKey: apiKey,
                engine: "google", // search engine
                num: 10, // number of results to search for
            },
        });
        // to avoid ads
        const results = await response.data.organic_results;

        // filtering results
        const filteredRes = results
            .map((res) => res.link)
            .filter((link) => {
                const isValid =
                    /youtube|facebook|twitter|x|beyondchats|reddit|instagram|linkedin/.test(
                        link
                    );
                const isFile = link.endsWith(".pdf") || link.endsWith(".docx");
                return !isValid && !isFile;
            });
        // return the top two valid results
        return filteredRes.slice(0, 2);
    } catch (error) {
        console.error(error);
        return [];
    }
};

module.exports = { getResults };
