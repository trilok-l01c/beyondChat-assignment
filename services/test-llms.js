const { rewriteArticles } = require("./llmService");
rewriteArticles("Test base", [{ url: "test.com", content: "sample" }])
    .then(console.log)
    .catch(console.error);
