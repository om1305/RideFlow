import { Router } from "express";
import { authLimiter } from "../Middleware/rateLimiter.js";
import { captainLogin, captainregister, getCaptainProfile, logoutCaptain } from "../Controllers/captain.controller.js";
import { Captainauth } from "../Middleware/captain.middleware.js";

const CaptainRoute = Router();

CaptainRoute.post("/register",authLimiter,captainregister);
CaptainRoute.post("/login",authLimiter,captainLogin);
CaptainRoute.get("/getprofile" , Captainauth, getCaptainProfile);
CaptainRoute.post("/logout" ,Captainauth ,logoutCaptain);

export default CaptainRoute;