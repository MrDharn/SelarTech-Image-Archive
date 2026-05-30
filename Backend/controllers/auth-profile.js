const userProfile = async(req, res)=>{
    try{
        const user = req.userInfo
        if(!user) return res.status(404).json({
            status: "Failed",
            message: "User not found"
        })

        res.status(200).json({
            status: "success",
            message: "User profile fetched successfully",
             user
        })
    } catch(e){
        console.error(e)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = userProfile