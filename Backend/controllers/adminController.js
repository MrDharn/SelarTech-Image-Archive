const adminController = async(req, res)=>{
    res.status(200).json({
        message: "Welcome to the admin Page"
    })
}

module.exports = adminController