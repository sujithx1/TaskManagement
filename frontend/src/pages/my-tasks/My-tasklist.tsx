import React, { useEffect } from 'react';
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
    useEffect(()=>{
        if(id)
        {
            dispatch(getTasks(id)).unwrap()

        }
    },[dispatch,id])

//   const tasks = [
//     {
//       status: 'In Progress',
//       priority: 'Medium Priority',
//       title: 'Create Marketing Email Templates',
//       description: 'Design engaging and visually appealing email templates for marketing campaigns...',
//       taskDone: 2,
//       totalTasks: 7,
//       startDate: '16th Mar 2025',
//       dueDate: '14th Apr 2025',
//       users: [
//         'https://i.pravatar.cc/32?u=1',
//         'https://i.pravatar.cc/32?u=2',
//       ],
//       edits: 2,
//     },
//     {
//       status: 'Pending',
//       priority: 'Low Priority',
//       title: 'Develop Expense Tracker Module',
//       description: 'Build an intuitive expense tracker that allows users to log expenses, categorize transactions...',
//       taskDone: 0,
//       totalTasks: 8,
//       startDate: '17th Mar 2025',
//       dueDate: '13th May 2025',
//       users: [
//         'https://i.pravatar.cc/32?u=3',
//         'https://i.pravatar.cc/32?u=4',
//       ],
//       edits: 2,
//     },
//     {
//       status: 'Completed',
//       priority: 'Medium Priority',
//       title: 'Migrate Database to MongoDB Atlas',
//       description: 'Move the existing MongoDB database to MongoDB Atlas for improved scalability and security...',
//       taskDone: 6,
//       totalTasks: 6,
//       startDate: '17th Mar 2025',
//       dueDate: '28th May 2025',
//       users: [
//         'https://i.pravatar.cc/32?u=5',
//         'https://i.pravatar.cc/32?u=6',
//       ],
//       edits: 0,
//     },
//   ];

  return (
    <div className="d-flex">
      <Sidebar/>
      <div className="container py-5">
      <div className="row g-4">
        {tasks.map((task, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
            <UserTaskCard task={task}  />
          </div>
        
    ))}
      </div>
    </div>
    </div>
  );
};

export default TaskList;
