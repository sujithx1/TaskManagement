
import React, { useEffect, useState } from 'react';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { Tasks_Statetypes } from '../../types/adminside';
import Admin_taskCard from './admin_taskCard';
import { getAllTask, getAllusers } from '../../routes/admin/adminapicalls';
import AdminSidebar from '../sidebar/AdminsideBar';
import { UserStateTypes } from '../../types/userside';
// import TaskCard from './';

const Admin_tasklist: React.FC = () => {
    const dispatch:AppDispatch=useDispatch()
    const [tasks,setTasks]=useState<Tasks_Statetypes[]>([])
    const [users,setUsers]=useState<UserStateTypes[]>([])
    
    useEffect(()=>{
      
      dispatch(getAllTask()).unwrap()
      .then((res)=>{
        setTasks(res)
      })
      dispatch(getAllusers()).unwrap()
      .then((res)=>{
        setUsers(res)
      })
      
      
    },[dispatch])
    
    const handleUpdateTask = (updatedTask: Tasks_Statetypes) => {
      console.log("taskss",tasks);
      
      console.log("Updating task with id:", updatedTask.id);
      setTasks(prev =>
        prev.map(task => {
          console.log(`Comparing ${task.id} with ${updatedTask.id}`);  // Log id comparison
          return task.id === updatedTask.id ? updatedTask : task;
        })
      );
    };
    const handleRemoveTak = (taskId: string) => {
      console.log("taskss",tasks);
      
      console.log("Updating task with id:", taskId);
      setTasks(prev =>
        prev.filter(task => {
          console.log(`Comparing ${task.id} with ${taskId}`);  // Log id comparison
          return task.id !== taskId ;
        })
      );
    };

  return (
    <div className="d-flex">
      <AdminSidebar/>
      <div className="container py-5">
      <div className="row g-4">
        {tasks.map((task, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
            <Admin_taskCard task={task}  allUsers={users} onTaskUpdate={handleUpdateTask} removeTask={handleRemoveTak}/>
          </div>
        
    ))}
      </div>
    </div>
    </div>
  );
};

export default Admin_tasklist;
