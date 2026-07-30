import { getAddressCoordinate, getAutoSuggesstion, getDistanceTime } from "../Services/Map.services.js";

export const getcoordinates = async(req , res ) => {
    const {address} = req.query ; 

    try {
        const coordinates = await getAddressCoordinate(address);
        res.status(200).json(coordinates);

    } catch (error) {
        console.error(error);
        res.status(500).json({message : error.message});
    }
}

export const getDistanceTimecontroller = async ( req , res) => {
    try {
        const {origin , destination} = req.query;

        const distance_time = await getDistanceTime(origin , destination);

        res.status(200).json(distance_time);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"internal server error"});
    }
}

export const getautocompletesuggestion = async(req , res) => {
    try {
        const {input} = req.query;

        const suggestions = await getAutoSuggesstion(input);
        return res.status(200).json(suggestions);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'internal server error'});
    }
}