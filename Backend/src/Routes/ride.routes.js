import { Router } from "express";
import { confirmRideController, createRideController, endRideController, getFareController, startRideController } from "../Controllers/ride.controller.js";
import { authUser } from "../Middleware/auth.middleware.js";
import { Captainauth } from "../Middleware/captain.middleware.js";


const RideRoute = Router();

RideRoute.post('/create' , authUser , createRideController );

RideRoute.post('/get-fare',authUser , getFareController);

RideRoute.post('/confirm',Captainauth , confirmRideController);

RideRoute.post('/start-ride' , Captainauth , startRideController);

RideRoute.post('/end-ride', Captainauth , endRideController);

export default RideRoute;