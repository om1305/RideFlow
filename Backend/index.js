import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import route from "./src/Routes/user.route.js";
import compression from "compression";
import CaptainRoute from "./src/Routes/captain.route.js";

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
app.listen(process.env.PORT ,()=>{
    console.log(`server started on ${process.env.PORT}`)
})