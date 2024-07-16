const express = require("express");
const app = express();
const cors = require("cors")
var bodyParser = require('body-parser')
const  connectdb  = require("./DB");

app.use(bodyParser.json());




app.use(cors())


connectdb();


app.listen( 4000 , () =>{
    console.log("Server is running on port 4000");

})