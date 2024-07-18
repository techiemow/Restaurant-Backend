const { RegistrationModel, BookingModel } = require("./Scheme");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const handleRegistration = async(req,res) => {
  console.log(req.body);
    
  const { username, password, phoneNumber, emailaddress } = req.body;
  if(username?.length && 
      password?.length && 
      emailaddress?.length && 
      phoneNumber?.length ) {
     
      const dbResponse = await RegistrationModel.create({
          username,
          emailaddress,
          password,
          phoneNumber
      });
      
      if (dbResponse?._id) {
          console.log("Created");
          res.send(dbResponse);
          return;
      }
  }
  res.send("Incorrect Data");

}

const handleLogin = async (username, password) => {
    try {
      // Find user by username
      const user = await RegistrationModel.findOne({ username });

      if (!user) {
        throw new Error("User not found");
      }

      // Compare entered password with hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ data: username }, "userkey");
        console.log("Token: " + token);
        return { success: true, username: user.username , token: token};
        
      } else {
        throw new Error("Incorrect password");
      }
    } catch (error) {
      throw new Error("Login failed");
    }
  };  

  const handleCreateBooking = async (apiReq, apiRes) => {
    const { selectedTime, selectedSeats, selectedDate, username, restaurentId } =
      apiReq.body;
  
    if (
      selectedTime?.length &&
      selectedSeats &&
      selectedDate?.length &&
      username?.length &&
      restaurentId?.length
    ) {
      const dbResponse = await BookingModel.create({
        selectedTime,
        selectedSeats,
        selectedDate,
        username,
        restaurentId,
        isCancelled: false,
      });
      if (dbResponse?._id) {
        apiRes.send(dbResponse);
      }
      return;
    }
  
    apiRes.send("Invalid data for booking");
  };

  const handleMyBookings = async (apiReq, apiRes) => {
    const { username } = apiReq.params;
  
    if (username?.length) {
      const dbResponse = await BookingModel.find({
        username,
      });
  
      if (dbResponse) {
        apiRes.send(dbResponse);
        return;
      }
    }
  
    apiRes.send("cant fetch details");
  };
  
  const handleCancelBooking = async (apiReq, apiRes) => {
    const { username, bookingId } = apiReq.params;
  
    if (username?.length && bookingId?.length) {
      const filter = {
        _id: new ObjectId(bookingId),
      };
      const update = { isCancelled: true };
      const dbResponse = await BookingModel.findOneAndUpdate(filter, update);
  
      if (dbResponse) {
        apiRes.send("Cancelled Success");
        return;
      }
    }
    apiRes.send("Cancelled Failed");
  };
  


  const handledBookedSlots = async (apiReq, apiRes) => {
    const { restaurentId, selectedDate } = apiReq.params;
    console.log(apiReq.params)
    const dbResponse = await BookingModel.find({
      restaurentId,
      selectedDate,
    });
    console.log(dbResponse);
    if (dbResponse?.length) {
      const slots = dbResponse.map((res) => res.selectedTime);
    
      apiRes.send(slots);
    }
  };

module.exports = { handleRegistration ,  handleLogin ,handleCreateBooking , handledBookedSlots ,handleMyBookings ,handleCancelBooking};

