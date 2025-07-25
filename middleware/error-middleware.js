const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Backend error";
    const extraDetails = err.extraDetails || "Error from Backend Server";


    res.status(status).json({
        message,
        extraDetails
    })
};


module.exports = errorMiddleware;