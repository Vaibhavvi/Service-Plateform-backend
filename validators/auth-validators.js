const {z} = require('zod');

// Create a schema for object 

const singnUpSchema = z.object({
    username:z
    .string({required_error:'Username is required'})
    .trim().min(3,{message:'Username must be at least 3 characters Long'})
    .max(20,{message:'Username not more than 20 characters'}),

    email:z
    .string({required_error:'Email is required'})
    .trim().min(3,{message:'Email must be at least 3 characters Long'})
    .max(20,{message:'Email not more than 20 characters'}),

    phone:z
    .string({required_error:'Phone is required'})
    .trim().min(10,{message:'Phone must be at least 10 characters Long'})
    .max(15,{message:'Username not more than 15 characters'}),

    password:z
    .string({required_error:'Password is required'})
    .trim().min(7,{message:'Password must be at least 3 characters Long'})
    .max(10,{message:'Password not more than 20 characters'})
});


module.exports = singnUpSchema;