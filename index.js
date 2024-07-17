const express = require("express");
const app = express();
const cors = require("cors")
var bodyParser = require('body-parser')
const  connectdb  = require("./DB");
const { handleRegistration, handleLogin } = require("./Service");

app.use(bodyParser.json());
app.use(cors());


connectdb();

app.get("/" , (req,res) =>{
    res.send("Welcome to FoodzAt page")
})



app.post("/registration", async (req, res) => {
    handleRegistration(req, res)
    
})

app.use("/Login/:username/:password", async(req, res) => {

    const { username, password } = req.params;

    try {
      const loginResult = await handleLogin(username, password);
      res.send(loginResult);
      console.log(loginResult)
    } catch (error) {
      console.error("Login error:", error.message);
      res.status(401).send("Login Failed: " + error.message);
    }
    
    




})




app.listen(4000 , () =>{
    console.log("Server is running on port 4000");

})