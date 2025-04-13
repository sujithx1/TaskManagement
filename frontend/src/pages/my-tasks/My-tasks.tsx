import React from 'react';
import { Tasks_Statetypes } from '../../types/adminside';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { changeStatusUser } from '../../routes/user/userapicalls';

interface TaskCardProps {
  task: Tasks_Statetypes;
}

const UserTaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { title, description, dueDate, priority, status, assignedTo, checklist } = task;
const dispatch:AppDispatch=useDispatch()
  const taskDone = checklist.length; // assuming checklist completion = checklist length
  const totalTasks = checklist.length || 1; // avoid division by zero
  const progress = Math.round((taskDone / totalTasks) * 100);

  const statusBadgeClass: Record<Tasks_Statetypes['status'], string> = {
    Pending: 'bg-secondary',
    Completed: 'bg-success',
    Cancelled:'bg-danger'
  };
  
  const priorityBadgeClass: Record<Tasks_Statetypes['priority'], string> = {
    Low: 'bg-success',
    Medium: 'bg-warning text-dark',
    High: 'bg-danger',
  };

  const handleStatusUpdate = async (userId: string , taskId: string) => {
    
    dispatch(changeStatusUser({userId,taskId,status:"Completed"}))
  
  
  };
  
  
  return (
    <div className="card shadow-sm rounded-4 h-100 position-relative">
      <div className="card-body">

        <div className="position-absolute top-0 end-0 m-3 d-flex flex-column align-items-end gap-1">
          <span className={`badge ${statusBadgeClass}`}>{status}</span>
          <span className={`badge ${priorityBadgeClass}`}>{priority} Priority</span>
        </div>

        <h5 className="card-title fw-semibold mb-1">{title}</h5>
        <p className="text-muted small mb-3">{description}</p>

        <div className="mb-2 small fw-medium">
          Checklist: <span className="fw-bold">{taskDone} / {totalTasks}</span>
        </div>
        <div className="progress mb-3" style={{ height: '8px' }}>
          <div className="progress-bar bg-info" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="d-flex justify-content-between text-muted small mb-3">
          <div>
            <strong>Due Date</strong><br />
            {dueDate.toString().slice(0, 10)}
          </div>
          {/* <div>
            <strong>Attachments</strong><br />
            {attachments.length} file{attachments.length !== 1 ? 's' : ''}
          </div> */}
        </div>

        <div className="mt-3">
          <strong className="small">Assigned Users:</strong>
          <ul className="list-unstyled mb-0 small">
          {assignedTo.map((assignee, index) => (
  <li key={index} className="d-flex justify-content-between align-items-center">
    <div>
      {typeof assignee.userId === 'object' && 'name' in assignee.userId
        ? assignee.userId.name
        : 'Unknown User'} - <span className="text-capitalize">{assignee.status}</span>
    </div>

    {assignee.status !== 'Completed' && (
      <button
        className="btn btn-sm btn-outline-success ms-2"
        onClick={() => handleStatusUpdate( 
          typeof assignee.userId === 'string' ? assignee.userId : assignee.userId._id||"",
           task.id || "")}
      >
        Mark Complete
      </button>
    )}
  </li>
))}

          </ul>
        </div>

      </div>
    </div>
  );
};

export default UserTaskCard;
