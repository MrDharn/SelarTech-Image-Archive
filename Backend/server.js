require('dotenv').config();
const express = require('express')
const dns = require('dns');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRoutes');
const dashBoardRoute = require('./routes/dashboardRoute');
const adminRoute = require('./routes/adminRoute');
const imageRoute = require('./routes/imageRoute')
const userProfileRoute = require('./routes/userProfileRoute')
const app = express();
const PORT = process.env.PORT || 3000;

//set server


dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

//use cors
app.use(cors())

//middleware to get the request body;
app.use(express.json());

//general middleware
app.use((req, res, next)=>{
    console.log(`This is getting from ${req.url} using ${req.method}`)
    next();
})

//getting the root route
app.get('/', (req, res)=> {
    res.send("SELARTECH ARCHIVE API running");
})

//api routes
app.use('/api/v1/', authRouter)
// app.use('/api/v1/', authRouter)

//routes to dashboard after authorization
app.use('/', dashBoardRoute)

//admin Routes
app.use('/', adminRoute)

//image upload route
app.use('/api/v1/', imageRoute);

//user profile route
app.use('/api/v1/', userProfileRoute);
//connect the server 
const startServer = async()=>{
    await connectDB()
    app.listen(PORT, ()=> {
        console.log(`The server has started running on the port ${PORT}`);
    })
}

startServer()
