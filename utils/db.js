const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

const ConnectDB = async () => {
  try {
    await mongoose.connect(URI);  // No options needed here
    console.log("✅ Database Connection Successful");
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = ConnectDB;
