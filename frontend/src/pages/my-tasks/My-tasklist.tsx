import React, { useCallback, useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../routes/user/userapicalls';
import UserTaskCard from './My-tasks';
// import TaskCard from './';

const TaskList: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    console.log("id",id);
    
    const dispatch:AppDispatch=useDispatch()
    // const [tasks,setTasks]=useState<Tasks_Statetypes[]>([])
     const {tasks}=useSelector((state:RootState)=>state.user)
     const fetchTasks = useCallback(() => {
      if (id) {
        dispatch(getTasks(id)).unwrap();
      }
    },[dispatch,id])
  
    useEffect(() => {
      fetchTasks();
    }, [fetchTasks]);




    

  return (
    <div className="d-flex">
      <Sidebar/>
      <div className="container py-5">
      <div className="row g-4">
        {tasks.map((task, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
            <UserTaskCard task={task} onStatusChange={fetchTasks}  />
          </div>
        
    ))}
      </div>
    </div>
    </div>
  );
};

export default TaskList;
