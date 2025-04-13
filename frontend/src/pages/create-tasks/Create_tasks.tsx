import React, { useEffect, useState } from 'react';
import './create_tasks.scss';
import AdminSidebar from '../sidebar/AdminsideBar';
import { Alert, UserStateTypes } from '../../types/userside';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { createTasks, getAllusers } from '../../routes/admin/adminapicalls';
import { TaskInput } from '../../types/adminside';
import Notification from '../../components/notifications/Notification';
import { add_Tasks } from '../../reducers/adminsidereducer';
import { useNavigate } from 'react-router-dom';

const CreateTaskForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [dueDate, setDueDate] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [checklist, setChecklist] = useState<string[]>([]);
  // const [attachments, setAttachments] = useState<string[]>([]);
  const [newTaskItem, setNewTaskItem] = useState('');
  // const [newAttachment, setNewAttachment] = useState('');
  const [showUserList, setShowUserList] = useState(false);
  const [users, setUsers] = useState<UserStateTypes[]>([]);
   const [alert,setAlert]=useState<Alert>({
      action:false,
      message:'',
      type:"idel",
     })
     const navigate=useNavigate()
  useEffect(() => {
    dispatch(getAllusers())
      .unwrap()
      .then((res) => setUsers(res));
  }, [dispatch]);

  const handleAddTask = () => {
    if (newTaskItem.trim()) {
      setChecklist([...checklist, newTaskItem.trim()]);
      setNewTaskItem('');
    }
  };

  // const handleAddAttachment = () => {
  //   if (newAttachment.trim()) {
  //     setAttachments([...attachments, newAttachment.trim()]);
  //     setNewAttachment('');
  //   }
  // };


    const handleSubmit = () => {
        const data:TaskInput={
            title: taskTitle,
            assignedTo:members,
            // attachments, 
            checklist, 
            description,
            dueDate,
            priority
            
        }
    console.log("submit",data);


    dispatch(createTasks(data)).unwrap()
    .then((res)=>{
        dispatch(add_Tasks(res))
        setAlert({
            action:true,
            message:'task created',
            type:'success'
          })
          navigate('/admin/tasks')  
    })
    
    // handle task submission logic
  };

  return (
    <>
    {alert.action && alert.type !== 'idel' && (
  <Notification
    message={alert.message}
    type={alert.type as 'success' | 'error' | 'info' | 'warning'}
    onClose={() =>
      setAlert({ ...alert, action: false, message: '', type: 'idel' })
    }
    duration={3000}
  />
)}
    <div className="d-flex">
      <AdminSidebar />

      <div className="create-task-form">
        <h2>Create Task</h2>

        {/* Task Title */}
        <label>Task Title</label>
        <input
          type="text"
          placeholder="Create App UI"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        {/* Description */}
        <label>Description</label>
        <textarea
          placeholder="Describe task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />

        {/* Priority and Due Date */}
        <div className="row">
          <div className="col">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="col">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Assign Members */}
          <div className="col">
            <label>Assign To</label>
            <button
              type="button"
              className="add-members-btn"
              onClick={() => setShowUserList(!showUserList)}
            >
              👥 Add Members
            </button>

            {showUserList && (
              <div className="user-list mt-3 card p-3 shadow-sm rounded">
                <h5 className="mb-3">Select Members</h5>
                <div className="user-list-grid">
                  {users.map((user, index) => (
                    <label key={index} htmlFor={`user-${user._id}`} className="user-item">
                      <input
                        type="checkbox"
                        id={`user-${user._id}`}
                        value={user._id}
                        checked={members.includes(user._id||"")}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setMembers((prev) =>
                            checked
                              ? [...prev, user._id||""]
                              : prev.filter((id) => id !== user._id)
                          );
                        }}
                      />
                      <span>
                        {user.name}{' '}
                        <small className="text-muted">({user.email})</small>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Checklist */}
        <label>TODO Checklist</label>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Task"
            value={newTaskItem}
            onChange={(e) => setNewTaskItem(e.target.value)}
            />
          <button onClick={handleAddTask}>+ Add</button>
        </div>
        <ul>
          {checklist.map((item, index) => (
            <li key={index}>✅ {item}</li>
          ))}
        </ul>

        {/* Attachments */}
        {/* <label>Add Attachments</label>
        <div className="input-group">
          <input
            type="text"
            placeholder="Add File Link"
            value={newAttachment}
            onChange={(e) => setNewAttachment(e.target.value)}
          />
          <button onClick={handleAddAttachment}>+ Add</button>
        </div>
        <ul>
          {attachments.map((item, index) => (
            <li key={index}>📎 {item}</li>
          ))}
        </ul> */}

        {/* Submit Button */}
        <button className="create-task-btn" onClick={handleSubmit}>
          CREATE TASK
        </button>
      </div>
    </div>
            </>
  );
};

export default CreateTaskForm;
