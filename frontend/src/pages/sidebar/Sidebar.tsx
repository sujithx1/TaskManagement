import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaThLarge, FaTasks, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Sidebar.scss'; // optional
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../routes/user/userapicalls';
import { logout } from '../../reducers/usersidereducer';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const {user}=useSelector((state:RootState)=>state.user)
  console.log("user ",user);
  
    const dispatch:AppDispatch=useDispatch()
  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const handlelogout=()=>{
    dispatch(logoutUser(user?._id||"")).unwrap()
    .then(()=>{ dispatch(logout())
        navigate('/login')
    })
    
  }

  return (
    <div
      className="d-flex flex-column bg-white p-4 shadow vh-100 justify-content-between sidebar-container"
      style={{ width: '260px' }}
    >
      {/* Top */}
      <div>
        <div className="text-center mb-4">
          <img
            src={user?.profilePic||"https://i.imgur.com/0y0y0y0.png"}
            alt="avatar"
            className="rounded-circle"
            style={{ width: '90px', height: '90px', objectFit: 'cover' }}
          />
          <div className="mt-2 fw-semibold fs-5">{user?.name}</div>
          <div className="text-muted small">{user?.email}</div>
        </div>

        <hr />

        <ul className="nav nav-pills flex-column">
        <li className="nav-item mb-2">
  <a
    className={`nav-link sidebar-link ${location.pathname === '/' ? 'active text-primary fw-semibold' : 'text-dark'}`}
    onClick={() => handleNavigate('/')}
  >
    <FaThLarge className="me-2" />
    Dashboard
  </a>
</li>

<li className="nav-item mb-2">
  <a
    className={`nav-link sidebar-link ${location.pathname === '/my-tasks' ? 'active text-primary fw-semibold' : 'text-dark'}`}
    onClick={() => handleNavigate(`/my-tasks/${user?._id}`)}
  >
    <FaTasks className="me-2" />
    My Tasks
  </a>
</li>

        </ul>
      </div>

      {/* Bottom */}
      <div>
        <a className="nav-link text-danger sidebar-link" onClick={handlelogout}>
          <FaSignOutAlt className="me-2" />
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
