const validate = (schema) => async (req,res,next) => {
    try {
        const parseBody = await  schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message ="Fill the required fileds properly";
        const extraDetails = err.errors[0].message;

        const error = {
            status:status,
            message:message,
            extraDetails: extraDetails
        }
        console.log(message)
      // res.status(400).json({message: message});
      next(error);
    }
}


module.exports = validate;