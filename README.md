# Beyondchats internship application assignment
A assignment project for internship application in *[Beyondchats](https://beyondchats.com/)* by **Trilok Lowanshi**.  
Here, below is an elaborated discussion about the workflow, tools and difficulties faced.
## Phase 1: Scraping, storing and delivering
Phase 1 asks for the scraping the 5 oldest blogs from [Beyondchat blogs](https://beyondchats.com/blogs) and saving their information to remote DB ([MongoDB atlas](https://www.mongodb.com/))
### Scraping
- Initially, we went the blogs and looked for the **last 5 oldest blogs**, named as
  - Can chatbots boost small business growth?
  - 10X your leads: How Chatbots revolutionize lead generation
  - 7 clear indicators your business needs a virtual assistant
  - 7 ways a chatbot transforms customer interactions
  - Chatbots magic: beginners guide.
- To **scrap** content from these blogs, we used `axios` to fetch HTML from the site and `cheerio` to extract the title, URL and date of the blogs from `article` tags.
### Storing
- Then to **store information** of blogs we used [MongoDB Atlas](https://www.mongodb.com/), with the help of it's library [Mongoose](https://www.mongoosejs.com).
- With Mongoose we made a schema of _title, URL, date_ and _processed_, and connect it to remote database at MongoDB atlas.
### Delivering
- We used `expressjs` for ease of making routes for the **API** and a local testing server. This **API** contain the **CRUD** functionalites _(Create, Read, Update, and Delete)_
- We used [insomia](app.insomnia.rest/app/authorize) to test the **CRUD API** functionalities.

## Phase 2: Research and Rewriting the articles
In this phase of project, we search for _two blogs_ related to the topic on which our each original blog is written, on google and rewrite the blog to using LLM. This was crucial and tough task.
* To search for _two blogs_ we used [serpApi](https://www.serpapi.com)
