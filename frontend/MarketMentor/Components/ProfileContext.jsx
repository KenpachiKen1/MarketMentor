import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();
import { useNavigate } from "react-router-dom";
import { useRef } from "react";



export function UserProvider ({children}) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const [portfolio, setPortfolio] = useState([]);

  const [search, setSearch] = useState("null");
  const [results, setResults] = useState([]);
  const [stock, setStock] = useState(null);

  const [dailyDP, setDailyDP] = useState(null);

  
  const dailyCacheRef = useRef({});
  async function getProfile() {
    try {
      const response = await fetch(`http://localhost:3000/profile-details`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access"),
        },
      });

      if (!response.ok) {
        setError(response);
        return null;
      }

      const data = await response.json();

      setProfile(data);
      console.log(data)
      return data;
    } catch (err) {
      setError(err);
      return err;
    }
  }


  async function stock_search() {

    try {
      const response = await fetch(`http://localhost:3000/stocks/search?ticker=${search}`, {
        method: 'GET',
        headers: {"Authorization" : "Bearer " + sessionStorage.getItem("access")}
      });

      if (!response.ok) {
        setError(response.error)
        return error
      }
      

      const data = await response.json()

      console.log(data)
      setResults(data.bestMatches);
    } catch (err){
      setError(err)
      return null;
    }
    
  }



  //when the stock gets clicked on, it'll have 3 tabs. each tab will be the responding information for daily, weekly, monthly
 async function daily(ticker) {
   if (dailyCacheRef.current[ticker]) {
     const freshCopy = structuredClone(dailyCacheRef.current[ticker]);
     setDailyDP(freshCopy);
     return freshCopy;
   }

   try {
     const response = await fetch(
       `http://localhost:3000/stocks/daily?ticker=${ticker}`,
       {
         headers: {
           Authorization: "Bearer " + sessionStorage.getItem("access"),
         },
       }
     );

     if (!response.ok) {
       setError(response);
       return null;
     }

     const data = await response.json();

     dailyCacheRef.current[ticker] = data;

     setDailyDP(data);
     return data;
   } catch (err) {
     setError(err);
     return null;
   }
 }


  async function update_profile() {
    try {
      const response = await fetch(
        `http://localhost:3000/update-profile`,
        {
          method: "PATCH",
          headers: { Authorization: "Bearer " + sessionStorage.getItem("access") }
        });
      
      if (!response.ok) {
        return response
      }

      const data = await response.json();

      return getProfile();
    } catch {

    }
  }

  async function add_to_port(ticker, company) {
    try {

      console.log("in function")
      const response = await fetch(
        `http://localhost:3000/user/add-to-portfolio`,
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("access"),
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({ ticker: ticker, company: company }),
        }
      );
      console.log(ticker);
      console.log(company);

      if (!response.ok) {
        console.log("in error block")
        setError(response.error);
        return error;
      }

      console.log("passed it");


      const data = await response.json();

      console.log(data)

      setPortfolio(data);

     
      return getProfile();

  
    } catch (err) {
      setError(err);
      return null;
    }
  }


  async function remove_from_port(ticker, company) {
    try {
      const response = await fetch(
        `http://localhost:3000/user/remove-from-portfolio`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticker: ticker, company: company }),
        }
      );

      if (!response.ok) {
        setError(response.error);
        return error;
      }

      const data = await response.json();

      setPortfolio(data);

      return getProfile();
    } catch (err) {
      setError(err);
      return null;
    }
  }



  return (
    <UserContext.Provider
      value={{profile, getProfile, error, stock_search,  daily, dailyDP, portfolio, remove_from_port, add_to_port, results, setSearch, search, update_profile, setDailyDP}}>
      {children}
    </UserContext.Provider>
  );
};

export const useAccount = () => useContext(UserContext);
