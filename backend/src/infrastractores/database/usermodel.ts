import mongoose, { Document, Schema } from "mongoose";



export interface Iuser extends Document {
    id:string;
    name:string;
    email:string;
    phone:string;
    password:string;
    prifile_image:string;
    isBlock:boolean;
    isAdmin:boolean; 
    createdAt:Date
    updatedAt:Date
}


const userSchema = new Schema<Iuser>({
    name: { type: String,required:true },
    email: { type: String, unique: true },
    phone:{ type: String,required:true },
    password: { type: String,required:true },
    isBlock:{ type: Boolean,default:false },
    isAdmin:{ type: Boolean,default:false },
  },{
    timestamps:true
  });
  
  export const userModel=mongoose.model('User',userSchema)