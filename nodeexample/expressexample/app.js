const express = require('express');

const app = express();


app.use(express.static(__dirname + "/public"));


app.get("/", (request, response) => {
    response.header('Content/Type', 'application/json')
    const output = {
        hi: "hello"
    };

    response.send(JSON.stringify(output));
})

const port = 3000;
app.listen(port, () => {
    console.log(`Express app listening on port: ${port}`)
})