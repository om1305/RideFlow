import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};

export const generateCaptainAcessToken = (captain) => {
    return jwt.sign({
        id:captain.id,
        type:"CAPTAIN",
    },
    process.env.JWT_SECRET , 
   {
    expiresIn:"15m",
   })
}