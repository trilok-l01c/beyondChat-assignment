const OpenAi = require("openai");
require("dotenv").config();
const client = OpenAi({ apiKey: process.env.OPENAI_API_KEY });

// rewriting the articles
const rewriteArticles = async (baseArticle, otherArticles) => {
    try {
        const res = await client.chat.complet.create({
            model: "gpt-5-nano",
            input: [
                {
                    role: "system",
                    content:
                        "You are a professional content architect: Rewrite the articles to match the tone, depth, structure and SEO formating of provided research articles",
                },
                {
                    role: "user",
                    content: ` 
                        Base article: ${baseArticle}
                        research article1: ${otherArticles[0]}
                        research article2: ${otherArticles[1]}
                        Tasks:
                        - rewrite the content of base article with matching the tone and structure formating of research articles
                        - keep all original facts of base article
                        - append references of research articles with url ${otherArticles[0].url} and ${otherArticles[1].url}.
                        `,
                },
            ],
            response_format: { type: "text" },
        });
        return res.output.content;
    } catch (error) {
        console.error("OpenAI error", error.messege);
        return null;
    }
};

module.exports = { rewriteArticles };
