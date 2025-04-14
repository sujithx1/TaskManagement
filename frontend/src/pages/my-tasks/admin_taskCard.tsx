import React, {  useState } from 'react';
import {  Tasks_Statetypes } from '../../types/adminside';
import { UserStateTypes } from '../../types/userside';
import { AppDispatch,  } from '../../store/store';
import { useDispatch,  } from 'react-redux';
import { EditTaks, removeTaskfromUser,  } from '../../routes/admin/adminapicalls';
import {  removeUserfromTask, setTask } from '../../reducers/adminsidereducer';
import { socket } from '../../configs/socket';

interface TaskCardProps {
  task: Tasks_Statetypes;
allUsers: UserStateTypes[]; // Assuming you have a list of all users to assign
  onUpdate?: (updatedTask: Partial<Tasks_Statetypes>) => void;
  onTaskUpdate?: (task: Tasks_Statetypes) => void;
  removeTask?:(taskId:string)=>void
}

const Admin_TaskCard: React.FC<TaskCardProps> = ({ task, allUsers ,onTaskUpdate,removeTask}) => {
  const [isEditing, setIsEditing] = useState(false);
// const {tasks}=useSelector((state:RootState)=>state.admin)
  // Editable fields
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate.toString().slice(0, 10));
  const [editedStatus, setEditedStatus] = useState(task.status);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedChecklist, setEditedChecklist] = useState(task.checklist);
  const [assignedUsers, setAssignedUsers] = useState(task.assignedTo); // Users already assigned
  const [selectedUser, setSelectedUser] = useState<string>(''); // Track the selected user to assign
  const dispatch:AppDispatch=useDispatch()
  // useEffect(()=>{
  //   console.log(tasks);
    
  // },[tasks])
  const statusBadgeClass: Record<string, string> = {
    Pending: 'bg-secondary',
    Completed: 'bg-success',
    Cancelled: 'bg-danger'
  };

  const priorityBadgeClass: Record<string, string> = {
    Low: 'bg-success',
    Medium: 'bg-warning text-dark',
    High: 'bg-danger'
  };

  // List of remaining users (those who are not already assigned to the task)
  const remainingUsers = allUsers.filter(user => !assignedUsers.some(assigned => typeof assigned.userId === 'object' && assigned.userId !== null && 'id' in assigned.userId 
    ? assigned.userId._id === user._id:true));

  const handleAssignUser = () => {
    if (selectedUser) {
      const userToAdd = allUsers.find(user => user.id === selectedUser);
      if (userToAdd) {
        setAssignedUsers([...assignedUsers, { userId: userToAdd._id||"", status: 'Pending' }]);
        setSelectedUser('');
      }
    }
  };

  const handleRemoveAssignedUser = (userId: string,taskId:string) => {
    setAssignedUsers(assignedUsers.filter(user => 
      typeof user.userId === 'object' && user.userId !== null && '_id' in user.userId 
        ? user.userId._id !== userId 
        : true
    ));
    console.log(userId,taskId);
    
    
    dispatch(removeTaskfromUser({userId,taskId})).unwrap()
    .then((res)=>{
      socket.emit('remove-user',{userId,taskId})
      if (res==null) {
        console.log("user is zzzeroooo");
        removeTask?.(taskId)
        
        
      }else{
        dispatch(removeUserfromTask({taskId,userId}))

      }   



    })
  };

  const handleSave = () => {
    setIsEditing(false);
    const data:Tasks_Statetypes={
      id: task.id,
      title: editedTitle,
      description: editedDescription,
      dueDate: new Date(editedDueDate),
      status: editedStatus,
      priority: editedPriority,
      checklist: editedChecklist,
      assignedTo: assignedUsers,
    }
    console.log(data);

    dispatch(EditTaks(data))
    .unwrap()
    .then((res)=>{
      console.log("res",res);
      onTaskUpdate?.(res); // ✅ Notifies the parent to update
      dispatch(setTask(res))
      

    })

    
    
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedDueDate(task.dueDate.toString().slice(0, 10));
    setEditedStatus(task.status);
    setEditedPriority(task.priority);
    setEditedChecklist(task.checklist);
    setAssignedUsers(task.assignedTo);
  };

  return (
    <div className="card shadow-sm rounded-4 h-100 position-relative">
      <div className="card-body">
        <div className="position-absolute top-0 end-0 m-3 d-flex flex-column align-items-end gap-1">
          {!isEditing ? (
            <>
              <span className={`badge ${statusBadgeClass[task.status] || 'bg-dark'}`}>{task.status}</span>
              <span className={`badge ${priorityBadgeClass[task.priority] || 'bg-dark'}`}>{task.priority} Priority</span>
              {
                task.status!=="Completed"&&

              <button className="btn btn-sm btn-outline-primary mt-1" onClick={() => setIsEditing(true)}>Edit</button>
              }
            </>
          ) : (
            <>
              <select
                className="form-select form-select-sm mb-1"
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value as "Pending" | "Completed" | "Cancelled")}
              >
                <option>Pending</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>

              <select
                className="form-select form-select-sm mb-1"
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value as "Low" | "Medium" | "High")}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-success" onClick={handleSave}>Save</button>
                <button className="btn btn-sm btn-outline-secondary" onClick={handleCancel}>Cancel</button>
              </div>
            </>
          )}
        </div>

        {/* Title */}
        {!isEditing ? (
          <h5 className="card-title fw-semibold mb-1">{task.title}</h5>
        ) : (
          <input
            type="text"
            className="form-control form-control-sm fw-semibold mb-2"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        )}

        {/* Assigned Users */}
        <div className="mt-3">
          <strong className="small">Assigned Users:</strong>
          <ul className="list-unstyled mb-0 small">
            {assignedUsers.map((assignee, index) => (
              <li key={index}>
                {
               typeof assignee.userId === 'object' && 'name' in assignee.userId
               ? assignee.userId.name
               : 'Unknown User'
                
                } - <span className="text-capitalize">{assignee.status}</span>
                {task.status==="Pending"&&

                <button className="btn btn-sm btn-danger ms-2" onClick={() => handleRemoveAssignedUser(typeof assignee.userId === 'string' ? assignee.userId : assignee.userId._id||"",task.id||"")}>Remove</button>
                }
              </li>
            ))}
          </ul>
        </div>

        {/* Remaining Users (those who are not assigned) */}
        {isEditing && remainingUsers.length > 0 && (
          <div className="mt-3">
            <strong className="small">Assign New User:</strong>
            <select
              className="form-select form-select-sm mb-2"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select a user</option>
              {remainingUsers.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <button className="btn btn-sm btn-primary" onClick={handleAssignUser} disabled={!selectedUser}>
              Assign User
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin_TaskCard;
