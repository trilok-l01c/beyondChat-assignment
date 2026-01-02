# Beyondchats internship application assignment
A assignment project for internship application in *[Beyondchats](https://beyondchats.com/)*.  
Here, below is an elaborated discussion about the workflow, tools and difficulties faced.
## Phase 1: Scraping and
Phase 1 asks for the scraping the 5 oldest blogs from [Beyondchat blogs](https://beyondchats.com/blogs) and saving their information to remote DB ([MongoDB atlas](https://www.mongodb.com/))
- Initially, we went the blogs and looked for the last 5 oldest blogs, named as
  - Can chatbots boost small business growth?
  - 10X your leads: How Chatbots revolutionize lead generation
  - 7 clear indicators your business needs a virtual assistant
  - 7 ways a chatbot transforms customer interactions
  - Chatbots magic: beginners guide.
- To scrap content from these blogs, we used `axios` to fetch HTML from the site and `cheerio` to extract the title, URL and date of the blogs from `article` tags.
- Then to save information of blogs we used [MongoDB'S Atlas](https://www.mongodb.com/), with the help of it's library [Mongoose](mongoosejs.com).
