
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/Protector";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import AdminDashBoard from "../pages/home/Admin.home";
import NotFound from "../components/404";
import CreateTaskForm from "../pages/create-tasks/Create_tasks";
import Admin_tasklist from "../pages/my-tasks/admintaskList";
import { useEffect } from "react";
import { Notyf } from "notyf";

import "notyf/notyf.min.css";
import { socket } from "../configs/socket";
import { Task_completeByUser } from "../types/adminside";
import { UpdateTask } from "../reducers/adminsidereducer";
const notyf = new Notyf();

const AdminRoutes = () => {
    const {isAuthenticated,admin}=useSelector((state:RootState)=>state.admin)
    const dispatch: AppDispatch = useDispatch();


    useEffect(()=>{
      if(!admin)return

        const handleTaskReceiver = (data:Task_completeByUser ) => {
            console.log("📥 task-reciver triggered", data);
            notyf.success(` ${data.user.name}  completed ${data.task.title} Task`);
            dispatch(UpdateTask(data))
        }
          socket.on("task-updated-admin", handleTaskReceiver);
          return()=>{
                  socket.off("task-updated-admin", handleTaskReceiver);
          }
    },[admin,dispatch])
    
  return (
    <>
    <Routes>

<Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>

  <Route path="home" element={<AdminDashBoard/>} />
  <Route path="create-task" element={<CreateTaskForm/>} />
  <Route path="tasks" element={<Admin_tasklist/>} />


</Route>

        <Route path="*" element={<NotFound/>} />

</Routes>

    
    </>
  )
}

export default AdminRoutes