import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/Protector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import UserDashboard from "../pages/home/Home";
import TaskList from "../pages/my-tasks/My-tasklist";
import SignUp from "../pages/signup/Signup";
import Login from "../pages/login/Login";
import NotFound from "../components/404";
import { useEffect } from "react";
import { socket } from "../configs/socket";
import { TaskNoty } from "../types/userside";
import { Notyf } from "notyf";

import "notyf/notyf.min.css";
import { addTask_user, removeTask } from "../reducers/usersidereducer";

// Create an instance
const notyf = new Notyf();

const Userroutes = () => {
  const { isAuthenticated, user ,tasks} = useSelector(
    (state: RootState) => state.user
  );
  const dispatch: AppDispatch = useDispatch();
  console.log("taskss  ",tasks);
  
  useEffect(() => {
    if (!user || !user._id) return;

    const handleTaskReceiver = (data: TaskNoty) => {
      console.log("📥 task-reciver triggered", data);

      const isAssigned = data.assignUser.includes(user._id as string);

      if (isAssigned) {
        dispatch(addTask_user(data.task));
        notyf.success(`📝 New task assigned: ${data.task.title}`);
      }
    };

    
    // return () => {
      //   socket.off("task-reciver", handleTaskReceiver)
      // }
      
      const handleRemoveUserFromTask = ({
        userId,
      taskId,
    }: {
      userId: string;
      taskId: string;
    }) => {
      console.log("📥 taskremoved triggered", userId, taskId);
      if (user._id == userId) {
        console.log("matched");
        
        dispatch(removeTask(taskId));
      }
    };
    
    socket.on("task-reciver", handleTaskReceiver);
    socket.on("removed-user", handleRemoveUserFromTask);
    
    return () => {
      socket.off("task-reciver", handleTaskReceiver);
      socket.off("removed-user", handleRemoveUserFromTask);
    };
  }, [user, dispatch]);

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/my-tasks/:id" element={<TaskList />} />
        </Route>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Userroutes;
