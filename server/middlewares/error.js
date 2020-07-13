module.exports = (err, req, res, next) => {
    let status = err.status || 500
    let errorMsg = err.errorMsg || "Unknown error"
    let message = err.message || "Internal Server Error" 

    if (err.name == "SequelizeValidationError") {
        status = 400
        errorMsg = "Validation_Error"
        message = err.message || "Data must complete!"
        
    } else if (err.name == "Not_Found") {
        status = 404
        errorMsg = "Not_Found"
        message = "Data not found!"
    }
    res.status(status).json({errorMsg, message})
}