const express = require("express");
const app = express();
const cors = require("cors")
var bodyParser = require('body-parser')
const  connectdb  = require("./DB");
const { handleRegistration } = require("./Service");

app.use(bodyParser.json());
app.use(cors());


connectdb();

app.get("/" , (req,res) =>{
    res.send("Welcome to FoodzAt page")
})



app.post("/registration", async (req, res) => {
    handleRegistration(req, res)
    
})




app.listen(4000 , () =>{
    console.log("Server is running on port 4000");

})