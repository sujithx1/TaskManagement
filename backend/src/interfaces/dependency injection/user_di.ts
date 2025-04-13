import { EditUser_useCase } from "../../application/use-cases/userside/edituser";
import { GetTaskUserSide_useCase } from "../../application/use-cases/userside/findtask";
import { GetUserById_useCase } from "../../application/use-cases/userside/finuserbyId";
import { LoginuseCase_user } from "../../application/use-cases/userside/loginuseCase";
import { PatchUpdateTaskuserSide_useCase } from "../../application/use-cases/userside/patchupdateTask";
import { User_signupuseCase } from "../../application/use-cases/userside/signupuseCase";
import { Taskmongorepositories } from "../../infrastractores/repositories/userside/taskmongorep";
import { UserRepoMongo } from "../../infrastractores/repositories/userside/usermongoRepositories";
import { Usercontroller } from "../controllers/user/usercontroller";

 const userRepo = new UserRepoMongo();
const taskrepo=new Taskmongorepositories()



const userSignup=new User_signupuseCase(userRepo)
const userlogin=new LoginuseCase_user(userRepo)
const finduser=new GetUserById_useCase(userRepo)
const edituser=new EditUser_useCase(userRepo)

const findTaskbyuserId=new GetTaskUserSide_useCase(taskrepo)
const patchupdateTask=new PatchUpdateTaskuserSide_useCase(taskrepo)

export const usercontroller=new Usercontroller(userSignup,userlogin,finduser,edituser,findTaskbyuserId,patchupdateTask)
