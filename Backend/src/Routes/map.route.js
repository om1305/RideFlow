import { Router } from "express";
import { authUser } from "../Middleware/auth.middleware.js";
import { getautocompletesuggestion, getcoordinates, getDistanceTimecontroller } from "../Controllers/map.controller.js";

const mapRoute = Router();

mapRoute.get('/getaddress' ,authUser , getcoordinates);
mapRoute.get('/distance-time' , authUser , getDistanceTimecontroller);
mapRoute.get("/getsuggestions" , authUser , getautocompletesuggestion );
export default mapRoute;