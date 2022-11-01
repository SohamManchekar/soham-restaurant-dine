const express = require("express")
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser")
const cors = require("cors");
const dotenv = require("dotenv");

const userRouter = require("./routes/userRoute");
const menuRouter = require("./routes/menuRoute");
const cartRouter = require("./routes/cartRoute")
const addressRouter = require("./routes/addressRoute");
const reviewRouter = require("./routes/reviewRoute");
const commentRouter = require("./routes/commentRoute");
const orderRouter = require("./routes/orderRoute")
const paymentRouter = require("./routes/paymentRoute")

const {getAllDishTitles,getDishByTypeAndCategory} = require("./controllers/menuController");

const app = express();

dotenv.config({path: "./config.env"})
app.use(cors({credentials:true, origin: process.env.ORIGIN}));
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/api/v1/user", userRouter)
app.use("/api/v1/menu", menuRouter)
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/order",orderRouter)
app.use("/api/v1/payment",paymentRouter)
app.use("/api/v1/address", addressRouter)
app.use("/api/v1/review", reviewRouter)
app.use("/api/v1/comment", commentRouter)
app.get("/api/v1/titles", getAllDishTitles)
app.get("/api/v1/typeCategory", getDishByTypeAndCategory)


// database connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Database Connected Successfully");
})
.catch((err) => {
    console.log("Error in database : "+err.message);
})


// server 
app.listen(process.env.PORT || 8080,() =>{
    console.log(`Server running on port ${process.env.PORT || 8080}`);
})