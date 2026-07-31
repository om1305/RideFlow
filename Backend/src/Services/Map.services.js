import axios from "axios";

export const getAddressCoordinate = async ( address) => {
    if(!address) throw new Error("Address not found");

    const apikey = process.env.VITE_GEOAPIFY_API_KEY;

    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apikey}`;

    try {
        const {data} = await axios.get(url);
        if(!data.features.length){
            throw new Error("Location not found");
        }
        const coordinates =  data.features[0].geometry.coordinates;

        return { 
            lat: coordinates[1],
            lon : coordinates[0]
        };
    } catch (error) {
        throw error;
    }
}

export const getDistanceTime = async (origin , destination) => {
    const apikey = process.env.VITE_GEOAPIFY_API_KEY;

    const originCoord = await getAddressCoordinate(origin);
    const destinationCoord = await getAddressCoordinate(destination);

    const url = `https://api.geoapify.com/v1/routing?waypoints=${originCoord.lat},${originCoord.lon}|${destinationCoord.lat},${destinationCoord.lon}&mode=drive&apiKey=${apikey}`;

    try { 
        const {data} = await axios.get(url);

        if(!data.features.length){
            throw new Error("No route Found");
        }
        const properties = data.features[0].properties;
        return {
            distances : {
                time:properties.time,
                distance:properties.distance 
            }
        };
    }catch(err){
        throw err;
    }
}

export const getAutoSuggesstion = async(input) => {

    if(!input){
        throw new Error("input is required");
    }
    const apikey = process.env.VITE_GEOAPIFY_API_KEY;

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&limit=5&apiKey=${apikey}`;
    try { 
        const {data} = await axios.get(url);
        return data.features.map(feature => feature.properties.formatted)
    }catch(err){
        throw err;
    }
}
