//Global error handler
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500; 

    res.status(status).json({
        status: false,
        message: err.message || 'Internal Server error',
        errors: err.details || null, // include validation errors if any
    });
};

module.exports = errorHandler;