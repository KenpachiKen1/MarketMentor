#
Developer Manual

###
Audience: Market Mentor is meant to be expanded on by future developers who like this idea.


##
Installation and set up.

You need to have the following installed:

-Node.js (**Version 18 or higher is recommend**)
-npm
-Git


##
Running on a local server

###
in your command line, after installing the required items, run:

**git clone https://github.com/your-org/MarketMentor.git**

cd into the directory

**cd MarketMentor**


to set up frontend,

##
cd to **frontend**

#
Install frontend dependencies:

**npm install**

##
run the frontend locally with

**npm run dev**


##
To set up your backend,

###
at the root of Market Mentor

###
cd backend


run **npm install** to install all dependencies.

to run the backend: use **npm start**

##
Make sure both are running simultaneously

#
**ENV REQUIREMENTS**

##

**In order to use this application. You need API keys from Alpha Vantage and CurrentsAPI**,  
Without it your code will not run correctly. getting these both is almost done in an **instant**

your .env variables in your backend should be:


**fill it in with your own credentials here**
CURRENTS_KEY=
ALPHA_KEY=

supaKey=
supaUrl=

JWT_SECRET=

**Make it these exactly or your code wont work**

#
**JWT_SECRET** is your JSONWEBTOKEN hash, this is not an API but instead a hash key used for user authentication purposes.

##
Running npm install in your backend, should have installed json web token's dependency

To create the hash run this commaand in your terminal: **openssl rand -hex 32**, this will generate a hash code, **COPY AND PASTE IT INTO YOUR ENV FILE AFTER**

#
BACKEND DOCUMENTATION:

##
Each function outside of the signup function requires a user to be authenticated (having their own account made through the signup function), so they can't just use each endpoint whenever, this is useful consiidering some endpoints require API keys, this is why I decided to use JSON Web Token for authentication purposes.

##
TESTS:
Market Mentor does not have any automated tests:
- This is a know limitation:
Endpoint testing was done manually through the use of Postman and just simple frontend responses.


Planned revisions for the future:
- Jest and the React Testing Library will be used for frontend testing.


###
API ENDPOINTS: 

Each endpoint does not do a lot of foward facing work, following SOLID principles, I split functionality for certain endpoints which you can find the full details of the code in **User.js, alpha.js, and currents.js.**


Authentication:

POST /login Authenticates a user and creates an access token for them
POST /signup creates a new user account and grants them an access token, also creates their portfolio.



User authenticated endpoints:

GET /news/search uses Currents API to search for articles relating to the query

GET /news/latest Uses CurrentsAPI to retrieve the latest news articles, with no query

GET /stocks/daily uses the Alpha Vantage API to retrieve the past 30 days, highs and closing points for a given stock

GET /stocks/search uses Alpha Vantage API to retrieve a list of stocks matching a ticker symbol

POST /user/add-to-portfolio doesn't use any API's simply adds a ticker symbol and the stock to the users portfolio

POST /user/add-to-portfolio removes the given stock from the users portfolio

PATCH /update-profile updates the users progress when they complete a learning module.



#
**KNOWN BUGS AND LIMITATIONS**

##
In the learning modules section, the frontend uses IFrame to embad webpages like youtube and new articles, this may cause slight glitches and console warnings, simply refresh your page or wait for everything to load correctly.


##
No automated tests yet

##
API LIMITS for Alpha Vantage prevents certain stocks from having their daily scatter plot to show, it works for most stocks but ones that break are **AAPL, NFLX, and MSFT** from the testing I have done.



#
Roadmap


#
Short Term:

-Started AI develpment with the use of LangChain, this is for an agentic AI tailored for stock market information only.

- Will add automated testing.


Long term:

-If there are enough users, adding a friend system that people can use to communicate with one another.
