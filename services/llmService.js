const Groq = require("groq-sdk");
require("dotenv").config({ path: "../.env" });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const rewriteArticles = async (baseArticle, researchSamples) => {
    try {
        // Prepare the research text to avoid confusing the LLM with JSON brackets
        const competitor1 = researchSamples[0]
            ? `SOURCE: ${
                  researchSamples[0].url
              }\nCONTENT: ${researchSamples[0].content.substring(0, 4000)}`
            : "N/A";
        const competitor2 = researchSamples[1]
            ? `SOURCE: ${
                  researchSamples[1].url
              }\nCONTENT: ${researchSamples[1].content.substring(0, 4000)}`
            : "N/A";

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a Senior SEO Content Editor. Your task is to rewrite a base article to match the high-quality professional tone, depth, and formatting of top-ranking competitors.",
                },
                {
                    role: "user",
                    content: `
                        ### TASK
                        Rewrite the 'Original Article' to be a high-quality, long-form blog post. 

                        ### STRUCTURE REQUIREMENTS
                        1. **Title**: Create a catchy, SEO-friendly H1 title.
                        2. **Key Takeaways**: Add a bulleted 'Key Takeaways' section immediately after the introduction.
                        3. **Body**: Use H2 and H3 headers to break up content. Ensure a natural flow.
                        4. **Conclusion**: Wrap up with a strong summary.
                        5. **References**: List the sources below as clickable Markdown links.

                        ### INPUT DATA
                        - **Original Content**: ${baseArticle}
                        - **Research Style Samples**: 
                        ${competitor1.content}
                        ${competitor2.content}
                        - ** Reference URLs **:
                        ${competitor1.source}
                        ${competitor2.source}
                        ### FINAL RULE
                        Return ONLY the Markdown content. Do not say "Here is the rewritten article."
                        `,
                },
            ],
            temperature: 0.7,
            max_tokens: 4096, // Ensure there is enough room for a full article
        });

        const result = completion.choices[0]?.message?.content || "";
        return result.trim();
    } catch (error) {
        console.error("Groq API Error:", error.message);
        return null;
    }
};

module.exports = { rewriteArticles };
