// Load environment variables from .env file
require("dotenv").config();

// Import required packages
const express = require("express");
const cors = require("cors");

const app = express();

// Import custom modules
const connectDB = require("./utils/db");
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const errorMiddleware = require("./middleware/error-middleware");

// CORS configuration to allow frontend (on Vercel) to access backend
const corsOptions = {
  origin: ["https://service-pateform-frontend.vercel.app"],
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON request bodies

// Root route for health check
app.get("/", (req, res) => {
  res.send("API is working on Render 🚀");
});

// API routes
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);

// Error handling middleware
app.use(errorMiddleware);

// Start the server after connecting to the database
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err);
  });
