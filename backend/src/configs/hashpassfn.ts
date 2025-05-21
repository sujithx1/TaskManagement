import bcrypt from "bcrypt"

export const hashfn=async (password:string)=>{
            return await bcrypt.hash(password, 10);
    
}