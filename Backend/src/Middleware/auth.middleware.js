import jwt from "jsonwebtoken"
import prisma from "../Config/prisma.js";

export const authUser = async(req,res,next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        if(!token){
            return res.status(401).json({
                message:"unauthorized",
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await prisma.user.findUnique({
            where:{
                id:decoded.id
            }
        });

        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }

        const {password , ...safeUser} = user;

        req.user = safeUser;
        return next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message:"unauthorized"
        });
    }
}