import {email, z} from "zod";

export const registerSchema = z.object({
    firstName : z.string().min(2),
    lastName:z.string().min(3).optional(),
    email:z.email(),
    password: z.string()
})

export const loginSchema = z.object({
    email:z.email(),
    password: z.string()
});

export const captainregisterSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(3).optional(),
    email: z.email(),
    password:z.string(),
    vehicleColour:z.string(),
    vehiclePlate:z.string(),
    vehicleCapacity:z.number({error:"vehicle capacity must be a number"}).int("vehicle capacity must be a whole number"),
    vehicleType: z.enum(["CAR","MOTORCYCLE","AUTO"])

}) ;

export const CaptainloginSchema = z.object({
    email : z.email(),
    password : z.string()
})