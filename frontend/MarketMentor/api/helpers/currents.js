//this file holds only functions relating to the currents api
const CurrentsAPI = require("currentsapi")
const currentsapi = new CurrentsAPI(process.env.CURRENTS_KEY);



async function search_news(stock) { 
    try {
       const search = await currentsapi.search({
           keywords: stock,
           language: 'en',
           category: ["stocks", "finance", "technology"],
           country: 'US',
           limit: '45',
       })
        
        if (search.status != "ok") {
            return new Error(search)
        }

        return search
    } catch (err) {
        
    }
}

async function latest_news() {
    try { 

        const news = await currentsapi.latestNews({
          keywords: "Technology",
          language: "en",
          category: ["stocks", "finance", "technology"],
          country: "US",
          limit: "5",
        });

         if (news.status != "ok") {
            return new Error(news);
         }
        
        
        
        return news

    } catch (err) {
        
    }
    
}

module.exports = {search_news, latest_news}