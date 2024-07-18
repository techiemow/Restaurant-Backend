const express = require("express");
const app = express();
const cors = require("cors")
var bodyParser = require('body-parser')
const  connectdb  = require("./DB");
const { handleRegistration, handleLogin, handleCreateBooking, handledBookedSlots, handleMyBookings, handleCancelBooking } = require("./Service");

app.use(bodyParser.json());
app.use(cors());


connectdb();


const logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Call next() to move to the next middleware or route handler
};


app.use(logRequest);

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

app.post("/createBooking", (apiReq, apiRes) => {
  handleCreateBooking(apiReq, apiRes);
});

app.get("/bookedSlots/:restaurentId/:selectedDate", (apiReq, apiRes) => {
  
  handledBookedSlots(apiReq, apiRes);
});

app.get("/mybookings/:username", (apiReq, apiRes) => {
  handleMyBookings(apiReq, apiRes);
});

app.put("/cancelBooking/:username/:bookingId", (apiReq, apiRes) => {
  handleCancelBooking(apiReq, apiRes);
});





app.listen(4000 , () =>{
    console.log("Server is running on port 4000");

})