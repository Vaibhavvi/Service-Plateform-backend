const User = require('../models/user-models');
const bcrypt = require('bcryptjs');

// Home page Logic 

const home = async (req, res) => {
    try {
        res.status(200).json('Welcome to the Home Page');
    } catch (error) {
        console.log(error);
    }
}


// Register page Logic

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ message: "User Already Exist" });
        }

        //        const saltRound = 10; // Hasing rounds
        //       const hash_password = await bcrypt.hash(password,saltRound); 

        const userCreated = await User.create({
            username,
            email,
            phone,
            password,
        });

        res.status(201).json({
            message: "Registered Sucessfully",
            token: await userCreated.genrateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error) {
      //  res.status(500).json({ message: "Page Not Found" })
      next(error);
    }
}


// Login page Logic

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userExist = await User.findOne({ email });
  
      if (!userExist) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Compare password using the instance method
      const isPasswordValid = await userExist.comparePassword(password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Generate token if password is valid
      const token = await userExist.genrateToken();
  
      res.status(200).json({
        message: "Login successful",
        token,
        userId: userExist._id.toString(),
      });
  
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
};  



// Get User Logic 

const getuser = async (req, res) => {

  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({userData});
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
}


module.exports = { home, register, login , getuser };