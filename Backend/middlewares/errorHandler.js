const errorHandler = (err, req, res, next) =>{
    const statusCode = res.statusCode;
    res.json({message: `${err.message}`});
    next();
};

module.exports = errorHandler;