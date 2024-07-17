const { RegistrationModel } = require("./Scheme");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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


module.exports = { handleRegistration ,  handleLogin};

