
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/Protector";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import UserDashboard from "../pages/home/Home";
import TaskList from "../pages/my-tasks/My-tasklist";
import SignUp from "../pages/signup/Signup";
import Login from "../pages/login/Login";
import NotFound from "../components/404";



const Userroutes = () => {
    const {isAuthenticated}=useSelector((state:RootState)=>state.user)


  return (
    <>
    
    
    <Routes>

      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>

        <Route path="/" element={<UserDashboard/>} />
        <Route path="/my-tasks/:id" element={<TaskList/>} />

      </Route>

      <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<NotFound/>} />

    </Routes>

    
    
    </>
  )
}

export default Userroutes