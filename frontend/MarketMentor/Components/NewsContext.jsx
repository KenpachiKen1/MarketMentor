import React, { createContext, use, useContext, useState } from "react";


const newsContext = createContext();

export function NewsProvider({ children }) {
    
    const [articles, setArticles] = useState([]);
    const [onLoadArticles, setOnLoadArticles] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null)
    const [progress, setProgress] = useState(0);


    const [loading, setLoading] = useState(false)
    async function latest_news() { //onload function
        try {
            setLoading(true)
            const data = await fetch(`/api/news/latest`, {
              method: "GET",
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("access"),
              },
            });

            if (!data.ok) {
                setError(data.error)
                return null
            }

            const response = await data.json()
            console.log(response)
            setOnLoadArticles(response.news)
            setLoading(false)
            return onLoadArticles
        } catch (err){
            setError(err)
            return null
        }
    }

    async function news_search(search) {
        try {

            setProgress(0);
        
            setLoading(true);
            const response = await fetch(
              `/api/news/search?search=${encodeURIComponent(search)}`,
              {
                method: "GET",
                headers: {
                  Authorization: "Bearer " + sessionStorage.getItem("access"),
                },
              }
            );

            if (!response.ok) {
                setError(response.error)
                setLoading(false)
                return null
            }

            const data = await response.json()
            setArticles(data.news)
            setProgress(100);

            setTimeout(() => {
              setLoading(false);
              setProgress(0);
            }, 100);

            return articles
        } catch (err) {
            setError(err);
            return null
        }
    }
    return (
        <newsContext.Provider value={{latest_news, loading, error, articles, search, setSearch, onLoadArticles, news_search, progress}}>
            {children}
        </newsContext.Provider>
    )
}

export const useNews = () => useContext(newsContext)