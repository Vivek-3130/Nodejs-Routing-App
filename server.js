const express = require('express');
const app = express();
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended:false}))
const route = require("./router");
const port = 3000;

app.use("/api",route);

//home route
app.get("/",(req,res)=>{
    res.send(`<h3>Routing App</h3>`);
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})