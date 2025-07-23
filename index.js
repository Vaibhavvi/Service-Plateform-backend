require("dotenv").config();
const express = require('express');
const cors = require("cors");
const app = express();

const connectDB = require('./utils/db');  // Import your ConnectDB function
const authRouter = require('./router/auth-router');
const contactRouter = require('./router/contact-router');
const errorMiddleware = require("./middleware/error-middleware");

// using cors to allow cross-origin requests

const crossOptions ={
    origin:"http://localhost:5173",
    methods:"GET, POST , PUT , DELETE , PATCH , HEAD ",
    Credentials:true
}
app.use(cors(crossOptions));

//Middleware to parse JSON requests

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use(errorMiddleware);

const PORT = 5000;

// Start the server only after the database connection is successful
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
