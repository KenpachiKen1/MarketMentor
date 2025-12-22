//This file holds all functions relating to user accounts
const supabaseurl = process.env.supaUrl
const supabasekey = process.env.supaKey;

const supabaseClient = require("@supabase/supabase-js");
const supabase = supabaseClient.createClient(supabaseurl, supabasekey);

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
async function signup(request) {
    try {
      

      console.log("supaUrl:", process.env.supaUrl);
      console.log("supaKey:", process.env.supaKey);
      const username = request.body.username;
      const password = request.body.password;
      const progress = 0;
        
      const hash_pw = await bcrypt.hash(password, 10) //for security



    
      const { data, error } = await supabase
        .from("Users")
        .insert([
          { username: username, password: hash_pw, progress: progress },
        ])
        .select()
        .single();

      if (error) {
        console.error(error);
      }
        
    const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
           expiresIn: "2h",
         });

      const add_on = await createPortfolio(username, data.id, );

      if (add_on == false) {
        return console.error("Failed to create users portfolio");
      }

      return {username: data.username, progress: data.progress, accessToken: token}
    } catch (err) {
      console.error(err);
    }
}

async function updateProgress(user) {
  

  const { data, error: userError } = await supabase.from("Users").select("*").eq("id", user.id).single()
  
  if (data.progress == 3) {
    return //do nothing, can only max out at three
  }

  let new_val = data.progress + 1;
  const { data: updated, error } = await supabase.from("Users").update({ progress: new_val }).eq("id", user.id).select()
  if (error) {
    return error
  }


  return {
          username: updated.username,
          progress: updated.progress,
        };


}

async function login(request) {
    const username = request.body.username;
    const password = request.body.password;

    const { data: user, error } = await supabase.from('Users').select('*').eq("username", username).single()
    
    if (error) {
        return console.error(error)
    }
    if (!user) {
        return {error : "There is no user with this username"}
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return {error : "Invalid password"}
    }

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        {expiresIn: "2h"}
    )

    return { accessToken: token }
}

function requireAuth(request, response) {
    const header = request.headers.authorization;

    if (!header) {
        return response.json({error: "Missing token"})
    }

    const token = header.replace("Bearer ", "")

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
      return decoded;

    } catch {
        return response.json({ error: "Invalid token" });
    }
}
async function getProfile(user) {
  const { data: userData, error: userError } = await supabase
    .from("Users")
    .select("id, username, progress")
    .eq("id", user.id)
    .single();

  if (userError || !userData) {
    console.error(userError);
    return null;
  }

  const { data: portfolio, error: portError } = await supabase
    .from("Portfolio")
    .select("id")
    .eq("user_id", userData.id)
    .single();

  if (portError || !portfolio) {
    console.error(portError);
    return null;
  }

  const { count, error: countError } = await supabase
    .from("PortfolioStocks")
    .select("*", { count: "exact", head: true })
    .eq("portfolio_id", portfolio.id);
  
    
   const { data: portfolioStocks, error: listError } = await supabase
        .from("PortfolioStocks")
        .select(`stock:Stocks (ticker,name)`)
     .eq("portfolio_id", portfolio.id);
  
  
  const list = portfolioStocks.map((row) => row.stock);

  
  

  if (countError) {
    console.error(countError);
    return null;
  }

  return {
    username: userData.username,
    progress: userData.progress,
    length: count,
    list: list
  };
}

async function createPortfolio(username, id) {
  try {
    const { data, error } = await supabase
      .from("Portfolio")
      .insert([{ user_id: id, name: username + "'s" + " portfolio"}]);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(err);
  }
}

async function removeFromPortfolio(user, company, ticker) {
    let { data: portfolio, error: portfolio_error } = await supabase
      .from("Portfolio")
      .select("*")
      .eq("user_id", user.id)
        .single();
    if (portfolio_error) {
        return console.error(portfolio_error) //getting the users portfolio
    }

    const portfolio_id = portfolio.id
    try {
        //first check if the stock exists, if it does add it, if not then just add it to the bridge.

        let { data: Stock, error } = await supabase.from('Stocks').select('*').eq('name', company).eq('ticker', ticker) //returns an array from most matching to least matching, the first index is the closest matching results


        if (error) {
            console.log(error)
        }
    

        //dont need to check to see if the stock is in the db, a user wouldn't be able to remove it if it wasn't

        
        const stock_id = Stock[0].id
         let { data: bridge, error: bridge_error } = await supabase
           .from("PortfolioStocks")
             .delete().eq("portfolio_id", portfolio_id).eq("stock_id", stock_id)
        
        if (bridge_error) {
          return console.error(bridge_error);
        }

       
     
      const { data: portfolioStocks, error: listError } = await supabase
        .from("PortfolioStocks")
        .select(`stock:Stocks (ticker,name)`)
        .eq("portfolio_id", portfolio_id);

      if (listError) {
        console.error(listError);
        return null;
      }

      return portfolioStocks.map((row) => row.stock);

    } catch (err) {
        console.error(err)
    }
    
    
       
}



//review this function later kenneth
async function addToPortfolio(user, company, ticker) {

    let { data: portfolio, error: portfolio_error } = await supabase
      .from("Portfolio")
      .select("*")
      .eq("user_id", user.id)
        .single();
    if (portfolio_error) {
        return console.error(portfolio_error)
    }

    const portfolio_id = portfolio.id
    try {
        //first check if the stock exists, if it does add it, if not then just add it to the bridge.

        let { data: Stock, error } = await supabase.from('Stocks').select('*').eq('name', company).eq('ticker', ticker)


        if (error) {
            console.log(error)
        }
        
        if (Stock.length == 0) { //creating the new stock object
            let { data, error } = await supabase.from('Stocks').insert([{ name: company, ticker: ticker }]).select()
            if (error) {
                return console.error(error)
            }

            let { data: bridge, error: bridge_error } = await supabase
              .from("PortfolioStocks")
              .insert([{ stock_id: data[0].id, portfolio_id: portfolio_id }])
              .select("*");// I want to return the updated list each time something is added to it
            if (bridge_error) {
                return console.error(bridge_error)
            }

            return bridge// the full portfolio list
        }

        //if the stock is already in the database
        
        let { data: bridge, error: bridge_error } = await supabase
          .from("PortfolioStocks")
          .insert([{ stock_id: Stock[0].id, portfolio_id: portfolio_id }])
            .select("*");
        
        if (bridge_error) {
          return console.error(bridge_error);
        }

        
      const { data: portfolioStocks, error: listError } = await supabase
        .from("PortfolioStocks")
        .select(
          `stock:Stocks (ticker,name)`)
        .eq("portfolio_id", portfolio_id);

      if (listError) {
        console.error(listError);
        return null;
      }

      return portfolioStocks.map((row) => row.stock);

    } catch (err) {
        console.error(err)
    }
}













module.exports = {createPortfolio, signup, addToPortfolio, removeFromPortfolio, requireAuth, login, getProfile, updateProgress}