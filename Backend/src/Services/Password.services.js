import bcrypt from "bcrypt";

const salt = 3;
export const hashing_Password = async (Password) =>{
    return bcrypt.hash(Password , salt )
} 

export const compare_password = async(Password , hashing_Password)=>{
    return bcrypt.compare(Password,hashing_Password);
}