const adminMiddleware = (req, res, next)=>{
    // const{email, role} = req.body

    try{
        if(req.userInfo.role !== 'admin') return res.status(400).json({message: "Unauthorize access"})

            console.log('Calling admin middleware')
            next()
    } catch(e){
        console.error(e);
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = adminMiddleware