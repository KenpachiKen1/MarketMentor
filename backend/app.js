require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const { search_news, latest_news } = require("./currents.js");
const { daily, search} = require("./alpha.js");

const { signup, addToPortfolio, removeFromPortfolio, login, requireAuth, getProfile, updateProgress} = require("./User.js")

const supabaseClient = require("@supabase/supabase-js");

//creating supabase client

const supabaseurl = process.env.supaUrl;
const supabasekey = process.env.supaKey;

const supabase = supabaseClient.createClient(supabaseurl, supabasekey);
const cors = require("cors")
const body = require("body-parser");
app.use(express.urlencoded({ extended: true })); 
app.use(body.json());
app.use(cors())
app.post("/signup", async (request, response) => {
  try {
    
    const data = await signup(request)

    if (!data) {
      return response.status(400).json({ error: "Account creation failed" });
    }

  
    return response.json(data);
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: "Signup failed" });

    }
})

app.get("/profile-details", requireAuth, async (request, response) => {
  const user = request.user
  const profile = await getProfile(user)

  if (!profile) {
    return response.status(500).json({error: "Profile not found"})
  }

  return response.status(200).json(profile)
})

app.patch("/update-profile", requireAuth, async (request, response) => {
  const user = request.user;
  const profile = await updateProgress(user);

  if (!profile) {
    return response.status(500).json({ error: "Profile not found" });
  }

  return response.status(200).json(profile);
});

app.delete("/delete-account", requireAuth , async (request, response) => {

  try {
    const userID = request.user.id
    const { error } = await supabase.from("Users").delete().eq("id", userID)
    
    if (error) {
      return response.status(500).json({error: "Failed to delete account"})
    }

    return response.status(200).json({success: "account deleted"})
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error : err });
  }
})


app.post("/login",  async (request, response) => { //Im Going to use JWT for dis

  const data = await login(request, response)

  return data //returns response.json()

}); 
app.get("/news/search", requireAuth, async (request, response) => {
  try {
    const data = await search_news(request.query.search);

    if (data) {
      return response.status(200).json(data);
    } else {
      return response.status(500).json({ error: data });
    }
    
  } catch (err) {
      return response.status(500).json({ error: err });
  }
});

app.get("/news/latest", requireAuth, async (request, response) => {
  try {
    const data = await latest_news();

    if (data) {
      return response.status(200).json(data);
    } else {
      return response.status(500).json({ error: data})
    }
  } catch (err) {
      return response.status(500).json({ error: err });
  }
});

app.get("/stocks/daily", requireAuth, async (request, response) => {
  try {
    const data = await daily(request.query.ticker);

    if (!data) {
      return response.status(500).json({ error: data });
    }

      return response.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});


app.get("/stocks/search", requireAuth, async (request, response) => {
  try {
    const data = await search(request.query.ticker);

    if (!data) {
      return response.status(500).json({ error: data });
    }

      return response.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});


app.post("/user/add-to-portfolio", requireAuth, async (request, response) => {
  const user = request.user

  const ticker = request.body.ticker
  const company = request.body.company


  try {
    const data = await addToPortfolio(user, company, ticker);
    return response.status(201).json(data)
  } catch {
     return response.status(500).json({error: "Failed to add to portfolio"})
}
  


});

app.post("/user/remove-from-portfolio", requireAuth, async (request, response) => {
  const user = request.user;

  const ticker = request.body.ticker;
  const company = request.body.company;

  try {
    const data = await removeFromPortfolio(user, company, ticker);
    return response.status(200).json(data);
  } catch {
    return response.status(500).json({ error: "Failed to remove from portfolio" });
  }
});


app.listen(port, () => {
  console.log(`Express app listening on port: ${port}`);
});
