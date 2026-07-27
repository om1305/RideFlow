// import Router from "express"

import { Router } from "express";
import { authLimiter } from "../Middleware/rateLimiter.js";
import { getProfile, login, logout, register } from "../Controllers/user.controller.js";
import { authUser } from "../Middleware/auth.middleware.js";

const route = Router();

route.post("/register",authLimiter,register);

route.post("/login" , authLimiter,login);

route.get("/getprofile",authUser ,getProfile);

route.post("/logout" , authUser , logout);

export default route;