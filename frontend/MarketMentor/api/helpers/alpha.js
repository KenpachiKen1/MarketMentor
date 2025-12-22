//this file only holds functions relating to the Alpha Vantage API
const alpha_key = process.env.ALPHA_KEY

async function daily(ticker) {

  try {
      
      
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${alpha_key}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'User-Agent': 'request' },
        })

        console.log("Made the request")

         if (!response.ok) {
           console.log("We in here for sum reason");
           return null;
         }

        console.log("passed the error mark")
        const data = await response.json()
        console.log(data)

        return data;
    } catch (err) {
        return {"error": err}
    }
}

async function weekly(ticker) {
    try {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${ticker}&apikey=${alpha_key}`;

      const response = await fetch(url, {
        method: "GET",
        headers: { "User-Agent": "request" },
      });

        if (!response.ok) {
          console.log(response.text);
          return null;
        }

      const data = await response.json();

      return data;
    } catch (err) {
      return { "error": err };
    }
    
}


async function monthly(ticker) {

    try {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${ticker}&apikey=${alpha_key}`;

      const response = await fetch(url, {
        method: "GET",
        headers: { "User-Agent": "request" },
      });

        if (!response.ok) {
          console.log(response.text);
          return null;
        }
      const data = await response.json();

      return data;
    } catch (err) {
      return { "error": err };
    }
    
}

async function search(keywords) {
   const url =
       `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${alpha_key}`;
    try {
        const response = await fetch(url, {
          method: "GET",
          headers: { "User-Agent": "request" },
        });


        if (!response.ok) {
            console.log(response.text)
            return null
        }

        const data = await response.json();

        return data
    } catch (err) {
        
    }
}

module.exports = {daily, monthly, weekly, search}


