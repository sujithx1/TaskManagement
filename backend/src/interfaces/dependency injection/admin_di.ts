import { CreateTask_useCase } from "../../application/use-cases/adminside/createtask";
import { EditTasks_useCase } from "../../application/use-cases/adminside/edittask";
import { GetAllTasks_useCase } from "../../application/use-cases/adminside/getalltasks";
import { Getusers_useCase } from "../../application/use-cases/adminside/getusers";
import { RemoveUserTask_useCase } from "../../application/use-cases/adminside/removetaskremoveuser";
import { AdminSideRepository } from "../../infrastractores/repositories/userside/adminmongorepositories";
import { Taskmongorepositories } from "../../infrastractores/repositories/userside/taskmongorep";
import { Admincontroller } from "../controllers/admincontroller";


const adminmongorepositories=new AdminSideRepository()
const taskrepositorires=new Taskmongorepositories()

const getusers=new Getusers_useCase(adminmongorepositories)
const createTask=new CreateTask_useCase(adminmongorepositories)
const  getTasks= new GetAllTasks_useCase(adminmongorepositories)
const updateTaks =new EditTasks_useCase(adminmongorepositories)
const removeuserfromtask=new RemoveUserTask_useCase(taskrepositorires,adminmongorepositories)


export const admincontroller=new Admincontroller(getusers,createTask,getTasks,updateTaks,removeuserfromtask)


