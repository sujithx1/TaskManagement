
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/Protector";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import AdminDashBoard from "../pages/home/Admin.home";
import NotFound from "../components/404";
import CreateTaskForm from "../pages/create-tasks/Create_tasks";
import Admin_tasklist from "../pages/my-tasks/admintaskList";

const AdminRoutes = () => {
    const {isAuthenticated}=useSelector((state:RootState)=>state.admin)

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