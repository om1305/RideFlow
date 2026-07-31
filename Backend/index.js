import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import route from "./src/Routes/user.route.js";
import compression from "compression";
import CaptainRoute from "./src/Routes/captain.route.js";
import mapRoute from "./src/Routes/map.route.js";
import RideRoute from "./src/Routes/ride.routes.js";

dotenv.config()
const app = express();
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users",route)
app.use("/api/v1/captain" , CaptainRoute)
app.use("/api/v1/map",mapRoute)
app.use("/api/v1/ride" , RideRoute);

app.listen(process.env.PORT ,()=>{
    console.log(`server started on ${process.env.PORT}`)
})