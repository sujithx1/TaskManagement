import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Tasks_Statetypes } from '../../types/adminside';
import { getTasks } from '../../routes/user/userapicalls';

const COLORS = ['#8e44ad', '#3498db', '#2ecc71']; // Pending, In Progress, Completed
const PRIORITY_COLORS = ['#27ae60', '#f39c12', '#e74c3c']; // Low, Medium, High

// const tasks = [
//   { id: '1', title: 'Fix Brake Issue', status: 'Pending', priority: 'High' },
//   { id: '2', title: 'Oil Change', status: 'In Progress', priority: 'Medium' },
//   { id: '3', title: 'Engine Diagnostics', status: 'Completed', priority: 'Low' },
//   { id: '4', title: 'AC Repair', status: 'Pending', priority: 'Medium' },
//   { id: '5', title: 'Wheel Alignment', status: 'Pending', priority: 'Low' },
// ];

const getStatusCounts = (tasks:Tasks_Statetypes[]) => {
  return ['Pending', 'In Progress', 'Completed'].map((status) => ({ 
    name: status,
    value: tasks.filter((t) => t.status === status).length,
  }));
};

const getPriorityCounts = (tasks:Tasks_Statetypes[]) => {


  return ['Low', 'Medium', 'High'].map((level) => ({
    name: level,
    value: tasks.filter((t) => t.priority === level).length,
  }));
};



const UserDashboard: React.FC = () => {
  const {tasks,user}=useSelector((state:RootState)=>state.user)
  const dispatch:AppDispatch=useDispatch()
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  useEffect(()=>{
    dispatch(getTasks(user?._id||""))

  },[dispatch,user])

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4" style={{ background: '#f9f9f9', minHeight: '100vh' }}>
        <h3 className="fw-bold mb-3">Good Morning! {user&&user.name}</h3>
        <p className="text-muted">{today}</p>

        {/* Stats Row */}
        <div className="row text-center mb-4">
          <div className="col"><span className="fw-bold text-primary">{tasks.length}</span><div>Total Tasks</div></div>
          <div className="col"><span className="fw-bold text-info">{getStatusCounts(tasks)[0].value}</span><div>Pending Tasks</div></div>
          <div className="col"><span className="fw-bold text-primary">{getStatusCounts(tasks)[1].value}</span><div>In Progress</div></div>
          <div className="col"><span className="fw-bold text-success">{getStatusCounts(tasks)[2].value}</span><div>Completed</div></div>
        </div>

        {/* Charts */}
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="p-3 bg-white rounded shadow-sm">
              <h5 className="fw-semibold">Task Distribution</h5>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={getStatusCounts(tasks)} dataKey="value" nameKey="name" outerRadius={80}>
                    {getStatusCounts(tasks).map((_, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="p-3 bg-white rounded shadow-sm">
              <h5 className="fw-semibold">Task Priority Levels</h5>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={getPriorityCounts(tasks)}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {getPriorityCounts(tasks).map((_, i) => (
                      <Cell key={`bar-${i}`} fill={PRIORITY_COLORS[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
