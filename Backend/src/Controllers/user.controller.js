import { compare_password, hashing_Password } from "../Services/Password.services.js";
import jwt  from "jsonwebtoken";
import prisma from "../Config/prisma.js";
import { loginSchema, registerSchema } from "../Validators/auth.validators.js";
import { generateAccessToken, generateRefreshToken } from "../Services/jwt.services.js";
import { success } from "zod";
import redisClient from "../Config/redis.js";

export const register = async(req , res) => {
    try{
        
        const result = registerSchema.safeParse(req.body);
        
        if(!result.success){
            return res.status(400).json(result.error.flatten());
        }
        const {firstName , lastName, email , password} = result.data;

        const user_email = await prisma.user.findUnique({
            where : {
                email:email
            }
        })
        if(user_email){
            return res.status(409).json({
                success:false,
                message:"User already exist"
            })
        }
        const pepperedPassword = password + process.env.PASSWORD_PEPPER;
        const hashedPassword = await hashing_Password(pepperedPassword);

        const user = await prisma.user.create({
            data:{
                firstName,
                lastName,
                email,
                password:hashedPassword,
            }
        })

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await redisClient.set(`session:${user.id}` , refreshToken ,
        {
            EX:7*24*60*60
        }
    );

        res.cookie("refreshToken" , refreshToken, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const { password: _, ...safeUser } = user;

        return res.status(201).json({
            success:true,
            accessToken,
            user: safeUser
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"error in register function",
            status:false
        })
    }
} 

export const login = async (req,res) => {
    try {
        const result = loginSchema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json(result.error.flatten());
        }
        const {email,password} = result.data;

        const user = await prisma.user.findUnique({
            where:{email}
        });

        if(!user){
            return res.status(401).json({
                message:"invalid email or password",
            })
        }

        const pepperedPassword = password + process.env.PASSWORD_PEPPER;
        const passwordmatch = await compare_password(pepperedPassword , user.password);

        if(!passwordmatch){
            return res.status(401).json({
                message:"invalid email or password",
            });
        }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await redisClient.set(`session:${user.id}` , refreshToken ,
        {
            EX:7*24*60*60
        }
    );

        res.cookie("refreshToken" , refreshToken,{
            httpOnly : true,
            secure: process.env.NODE_ENV ==="production",
            sameSite: "strict" ,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
         
        const {password: _, ...safeUser} = user;

        return res.status(200).json({
            success:true,
            accessToken,
            user:safeUser
        })

    } catch (error) {
        res.status(500).json({
            message:"error in login"
        });
        console.log(error)
    }
}

export const getProfile = async(req,res) => {
    return res.status(200).json({
        success:true,
        user: req.user
    })
}

export const logout = async(req,res)=>{
    await redisClient.del(`session:${req.user.id}`);
    res.clearCookie("refreshToken");
    return res.status(200).json({
        success:true,
        message:"LOGGED OUT SUCCESSFULLY"
    });
}