const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const rewriteArticle = async (baseArticle, researchSamples) => {
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
                    TASK: 
                    1. Completely rewrite the 'ORIGINAL ARTICLE' provided below.
                    2. Use the 'RESEARCH SAMPLES' to adopt a similar professional tone, use H2 and H3 headers, and improve the formatting.
                    3. The final article MUST be at least 600 words long.
                    4. At the very bottom, add a section called '## References' and list the URLs of the research samples.

                    ORIGINAL ARTICLE TO REWRITE:
                    ${baseArticle}

                    RESEARCH SAMPLES FOR STYLE & DEPTH:
                    ---
                    ${competitor1}
                    ---
                    ${competitor2}
                    ---

                    Final Output Requirement: Return ONLY the rewritten article in Markdown format.`,
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

module.exports = { rewriteArticle };
