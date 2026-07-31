import { z } from "zod";

export const createRideSchema = z.object({
    pickup: z.string().min(3),
    destination: z.string().min(3),
    vehicleType: z.enum(["CAR", "AUTO", "MOTO"])
});

export const fareSchema = z.object({
    pickup: z.string().min(3),
    destination: z.string().min(3)
});

export const confirmRideSchema = z.object({
    rideId: z.string().uuid()
});

export const startRideSchema = z.object({
    rideId: z.string().uuid(),
    otp: z.string().length(6)
});

export const endRideSchema = z.object({
    rideId: z.string().uuid()
});