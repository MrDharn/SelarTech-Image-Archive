const dashBoardController = async(req, res)=>{
    try{
        res.status(200).json("Welcone to the dashboard");
    }catch(e){
        console.error(e)
        res.status(500).json({message: "Internal Server error"})
    }
}

module.exports = dashBoardController