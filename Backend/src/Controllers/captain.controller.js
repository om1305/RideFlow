import { compare_password, hashing_Password } from "../Services/Password.services.js";
import { CaptainloginSchema, captainregisterSchema } from "../Validators/auth.validators.js"
import prisma from "../Config/prisma.js";
import { generateCaptainAcessToken, generateRefreshToken } from "../Services/jwt.services.js";
import redisClient from "../Config/redis.js";

export const captainregister = async(req , res) => {
    try {
        
        const result = captainregisterSchema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json(result.error.flatten());
        }

        const {firstName , lastName , email , password ,vehicleColour ,  vehiclePlate , vehicleCapacity , vehicleType } = result.data;

        const isCaptainExist = await prisma.captain.findUnique({
            where : {
                email
            }
        })

        if(isCaptainExist){
            return res.status(400).json({
                message:"Captain already exist"
            })
        }
        const existingPlate = await prisma.captain.findUnique({
    where: {
        vehiclePlate
    }
});

if (existingPlate) {
    return res.status(400).json({
        message: "Vehicle already registered"
    });
} 


        const pepperedpassword = password + process.env.PASSWORD_PEPPER;
        const hashedPassword = await hashing_Password(pepperedpassword);

        const captain = await prisma.captain.create({
            data:{
                firstName,
                lastName,
                email,
                password:hashedPassword,
                vehicleColour,
                vehiclePlate,
                vehicleCapacity,
                vehicleType
            }
        })

        const accessToken = generateCaptainAcessToken(captain);
        const refreshToken = generateRefreshToken(captain);

        await redisClient.set(`session:${captain.id}` , refreshToken ,
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


        const {password: _ , ...safecaptain} = captain;

        res.status(201).json({
            success:true,
            accessToken,
            captain : safecaptain,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"error in captain registers function"
        })
    }
}

export const captainLogin =async(req,res) => {
    try {
        
        const result = CaptainloginSchema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json(result.error.flatten());
        }

        const { email, password } = result.data;

        const captain = await prisma.captain.findUnique({
            where : {
                email
            }
        });

        if(!captain){
            return res.status(401).json({
                message:"invalid email or password",
            })
        }
        const pepperedPassword = password + process.env.PASSWORD_PEPPER;
        const passwordmatch = await compare_password(pepperedPassword , captain.password);

        if(!passwordmatch){
            return res.status(401).json({
                message:"invalid email or password",
            });
        }

        const accessToken = generateCaptainAcessToken(captain);
        const refreshToken = generateRefreshToken(captain);

        await redisClient.set(`session:${captain.id}` , refreshToken ,
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


        const {password: _ , ...safecaptain} = captain;

        res.status(200).json({
            success:true,
            accessToken,
            captain : safecaptain,
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"error in captainlogin function"
        })
    }
} 

export const getCaptainProfile =(req,res) => {
    try{

        res.status(200).json({captain:req.captain});
    }catch(error){
        console.error(error)
    }
}

export const logoutCaptain = async (req,res) => {
    await redisClient.del(`session:${req.captain.id}`);
    res.clearCookie("refreshToken");
    return res.status(200).json({
        success:true,
        message:"LOGGED OUT SUCCESSFULLY"
    })
}