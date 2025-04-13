export interface userEntity{
    id:string;
    name:string;
    email:string;
    phone:string;
    password:string
    prifile_image:string
    isBlock?:boolean;
    isAdmin?:boolean;

}