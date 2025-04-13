import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import AdminSidebar from '../sidebar/AdminsideBar';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTask } from '../../routes/admin/adminapicalls';
import { Tasks_Statetypes } from '../../types/adminside';

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

const AdminDashBoard: React.FC = () => {
const {tasks}=useSelector((state:RootState)=>state.admin)

  const dispatch:AppDispatch=useDispatch()
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  useEffect(()=>{
dispatch(getAllTask())
  },[dispatch])

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="flex-grow-1 p-4" style={{ background: '#f9f9f9', minHeight: '100vh' }}>
        <h3 className="fw-bold mb-3">Good Morning! Adam Cole</h3>
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

export default AdminDashBoard;
