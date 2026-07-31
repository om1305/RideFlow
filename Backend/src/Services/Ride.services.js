import { getDistanceTime } from "./Map.services.js";
import prisma from "../Config/prisma.js";
import crypto from "crypto";


export const getFare = async(pickup , destination) =>{
    const perKmRate = {
        CAR : 15 ,
        AUTO: 10 ,
        MOTO : 8
    };
    const baseFare = {
        CAR : 30 ,
        AUTO : 20,
        MOTO : 15,
    } 
    const perMinRate = {
        CAR : 3,
        AUTO :2 ,
        MOTO : 1.5
    }

    const distanceTime = await getDistanceTime(pickup , destination);
    const fare = {
        CAR : baseFare.CAR + (distanceTime.distances.distance/1000)*perKmRate.CAR + (distanceTime.distances.time/60)*perMinRate.CAR,
        AUTO :  baseFare.AUTO + (distanceTime.distances.distance/1000)*perKmRate.AUTO + (distanceTime.distances.time/60)*perMinRate.AUTO,
        MOTO  : baseFare.MOTO + (distanceTime.distances.distance/1000)*perKmRate.MOTO + (distanceTime.distances.time/60)*perMinRate.MOTO
    }

    return fare;

}

function getOTP(num){
    function generateotp(num){
        const otp = crypto.randomInt(Math.pow(!0,num-1) , Math.pow(10,num)).toString();
        return otp;
    }
    return generateotp(num);
}

export const createRide = async({user , pickup , destination , vehicleType}) => { 
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error("All fields are required");
    }
    const fares = await getFare(pickup , destination);


    const ride = await prisma.ride.create({
        data : {
            userId : user,
            pickup,
            destination,
            fare : fares[vehicleType] ,
            otp: crypto.randomInt(100000 , 999999).toString()
        }
    })

    return ride;
    
}

export const confirmRide = async(rideId , captain) => { 
    if(!rideId){
        throw new Error("Ride id is required");
    }
    await prisma.ride.update({
        where : {id: rideId} ,
         data:{
            status:'ACCEPTED',
            captainId:captain.id
        }
    });

    const ride = await prisma.ride.findUnique({
        where : {id:rideId},
        include:{user:true}
    });

    if(!ride){
        throw new Error("Ride not found");
        
    }

    return ride;
}

export const startRide = async({rideId , otp , captain}) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await prisma.ride.findUnique({
        where : {id:rideId},
        include : {
            user: true,
            captain:true,
        }
    });

    if (!ride) {
        throw new Error("Ride not found");
    }

    if (ride.status !== "ACCEPTED") {
        throw new Error("Ride not accepted");
    }

    if (ride.otp !== otp) {
        throw new Error("Invalid OTP");
    }

    await prisma.ride.update({
        where:{id:rideId},
        data:{
            status:"ONGOING",
        }
    })

    return ride;
}

export const endRide = async({rideId , captain}) => {
    if(!rideId){
        throw new Error("Ride id is required");
    }
    const ride = await prisma.ride.findFirst({
        where:{id:rideId , captainId:captain.id},
        include:{
            user : true,
            captain : true,
        }
    });
    if(!ride){
        throw new Error("Ride not found");
    }
     if (ride.status !== "ONGOING") {
        throw new Error("Ride not ongoing");
    }
    await prisma.ride.update({
        where : {id:rideId},
        data:{status:"COMPLETED"}
    });
    return ride;
} 