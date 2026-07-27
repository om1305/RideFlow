import {z} from "zod";

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