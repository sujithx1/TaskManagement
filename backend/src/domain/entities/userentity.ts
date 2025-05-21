export interface userEntity{
    id:string;
    name:string;
    email:string;
    phone:string;
    password:string
    isBlock?:boolean;
    isAdmin?:boolean;
    createdAt?:Date;
    updatedAt?:Date


}