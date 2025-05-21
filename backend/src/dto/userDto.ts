


export interface UserResponseDto{
    id:string;
    _id:string;
    name:string,
    email:string;
    phone:string;
    prifile_image?:string
    isBlock?:boolean;
    isAdmin?:boolean;

}

export interface CreateUserRequestDTO{
    name:string,
    email:string;
    phone:string;
    password:string
}