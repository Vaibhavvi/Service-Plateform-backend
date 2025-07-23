const mongoose = require('mongoose');

// MongoDB URI
//const URI = "mongodb+srv://vaibhav:Vaibhav111@cluster0.fito9.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=Cluster0";

const URI = process.env.MONGODB_URI;

// Function to connect to MongoDB
const ConnectDB = async () => {
    try {
        // Try to connect to the database
        await mongoose.connect(URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log("Database Connection Successful");
    } catch (error) {
        console.log("Database Connection Failed");
        console.error(error);  // Log the error details for debugging
        process.exit(1);  // Exit the process with failure code
    }
}

module.exports = ConnectDB;
