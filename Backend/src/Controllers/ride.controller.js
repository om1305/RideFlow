import { getAddressCoordinate } from "../Services/Map.services.js";
import prisma from "../Config/prisma.js";
import { createRide , confirmRide, endRide, getFare, startRide } from "../Services/Ride.services.js";
import { confirmRideSchema, createRideSchema, endRideSchema, fareSchema, startRideSchema } from "../Validators/ride.validators.js";

export const createRideController = async (req, res) => {
    // const { pickup, destination, vehicleType } = req.body;

    const parsed = createRideSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            errors: parsed.error.issues
        });
    }

    const { pickup, destination, vehicleType } = parsed.data;

    try {

        const ride = await createRide({
            user: req.user.id,
            pickup,
            destination,
            vehicleType
        });

        res.status(201).json(ride);

        const pickupCoordinates = await getAddressCoordinate(pickup);

        // const captains = await getCaptainsInTheRadius(
        //     pickupCoordinates.lat,
        //     pickupCoordinates.lon,
        //     2
        // );

        const rideWithUser = await prisma.ride.findUnique({
            where: {
                id: ride.id
            },
            include: {
                user: true
            }
        });

        if (rideWithUser) {
            rideWithUser.otp = "";
        }
        // captains.forEach((captain) => {

        //     if (captain.socketId) {

        //         sendMessageToSocketId(captain.socketId, {
        //             event: "new-ride",
        //             data: rideWithUser
        //         });

        //     }

        // });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: err.message
        });

    }
};

export const getFareController = async (req, res) => {

    
    const parsed = fareSchema.safeParse(req.query);
    
    if (!parsed.success) {
        return res.status(400).json({
            errors: parsed.error.issues
        });
    }
    const { pickup, destination } = parsed.data;


    try {

        const fare = await getFare(pickup, destination);

        return res.status(200).json(fare);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

};

export const confirmRideController = async (req, res) => {

    const parsed = confirmRideSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            errors: parsed.error.issues
        });
    }
    const { rideId } = parsed.data;

    try {
        
        const ride = await confirmRide(rideId, req.captain);
        // ride.otp = "";

        // sendMessageToSocketId(ride.user.socketId, {
        //     event: "ride-confirmed",
        //     data: ride
        // });

        return res.status(200).json(ride);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

};

export const startRideController = async (req, res) => {

    const parsed = startRideSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            errors: parsed.error.issues
        });
    }


    const { rideId, otp } = parsed.data;

    try {

        const ride = await startRide({
            rideId,
            otp,
            captain: req.captain
        });

        ride.otp = "";

        // sendMessageToSocketId(ride.user.socketId, {
        //     event: "ride-started",
        //     data: ride
        // });

        return res.status(200).json(ride);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

};

export const endRideController = async (req, res) => {

    const parsed = endRideSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            errors: parsed.error.issues
        });
    }

    const { rideId } = parsed.data;

    try {

        const ride = await endRide({
            rideId,
            captain: req.captain
        });

        ride.otp = "";
        // sendMessageToSocketId(ride.user.socketId, {
        //     event: "ride-ended",
        //     data: ride
        // });

        return res.status(200).json(ride);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

};