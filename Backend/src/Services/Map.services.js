import axios from "axios";
import prisma from "../Config/prisma.js";

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


// export const getCaptainsInTheRadius = async (lat, lon, radius) => {
//     try {

//         const captains = await prisma.captain.findMany({
//             where: {
//                 socketId: {
//                     not: null
//                 },
//                 locationLat: {
//                     not: null
//                 },
//                 locationLon: {
//                     not: null
//                 }
//             }
//         });

//         const nearbyCaptains = captains.filter((captain) => {

//             const distance = getDistance(
//                 lat,
//                 lon,
//                 captain.locationLat,
//                 captain.locationLon
//             );

//             return distance <= radius;

//         });

//         return nearbyCaptains;

//     } catch (err) {
//         throw err;
//     }
// };

export const getCaptainsInTheRadius = async () => {
    try {
        return await prisma.captain.findMany({
            where: {
                socketId: {
                    not: null
                }
            }
        });
    } catch (err) {
        throw err;
    }
};

const getDistance = (lat1, lon1, lat2, lon2) => {

    const R = 6371; // Earth's radius in KM

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};
