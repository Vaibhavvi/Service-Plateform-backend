const mongoose = require('mongoose'); // Import mongoose for MongoDB object modeling 
const bcrypt = require('bcryptjs'); // Import bcryptjs
const jwt = require('jsonwebtoken'); // Import json web token 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

// Secure the password using bcrypt
userSchema.pre('save', async function (next) {
    const user = this;

    // If the password is not modified, skip hashing
    if (!user.isModified('password')) {
        return next(); // Don't hash the password if it's not modified
    }

    try {
        const saltRounds = await bcrypt.genSalt(10); // Salt rounds
        const hashedPassword = await bcrypt.hash(user.password, saltRounds); // Hash the password
        user.password = hashedPassword; // Replace the plain password with the hashed one
        next(); // Continue with saving the user
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});

// Compare the password 

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

// JWT token genration 
userSchema.methods.genrateToken = async function () {
    try {
        return jwt.sign({
            userId : this._id.toString(),
            email : this.email,
            isAdmin : this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn : '30d',
        }
    )
    } catch (error) {
      console.error(error);  
    }
}

// Define the model or collection name 
const User = mongoose.model('User', userSchema);
module.exports = User;
