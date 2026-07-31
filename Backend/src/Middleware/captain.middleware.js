import prisma from "../Config/prisma.js";
import jwt from "jsonwebtoken";

export const Captainauth = async (req , res, next)=>{
    try{
         const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        

        if(!token){
            return res.status(401).json({
                message:"unauthorized",
            })
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const entity = await prisma.captain.findUnique({
            where : {
                id:decoded.id
            }
        });
    
        if(!entity){
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const {password , ...safeEntity} = entity;
        req.captain= safeEntity;
    
        return next();
    }catch(error){
        console.error(error);
        res.status(401).json({
            message:"ERROR in captainAuth"
        })
    }
}