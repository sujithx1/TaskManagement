import { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Adminsidebar.scss'; // you can style this with SCSS or CSS
import { logoutUser } from '../../routes/user/userapicalls';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { logout } from '../../reducers/usersidereducer';

const navItems = [
  { label: 'Dashboard', path: '/admin/home', icon: '📊' },
  { label: 'Manage Tasks', path: '/admin/tasks', icon: '✅' },
  { label: 'Create Task', path: '/admin/create-task', icon: '➕' },
  // { label: 'Team Members', path: '/admin/team', icon: '👥' },
  // { label: 'Logout', icon: '↩️' },
];

const AdminSidebar: FC = () => {
  const location = useLocation();
const {admin}=useSelector((state:RootState)=>state.admin)
const dispatch:AppDispatch=useDispatch()
const navigate=useNavigate()
   const handlelogout=()=>{
      dispatch(logoutUser(admin?._id||"")).unwrap()
      .then(()=>{ dispatch(logout())
          navigate('/login')
      })
      
    }

  return (
    <div className="admin-sidebar">
      <h2 className="logo">Task Manager</h2>
      <div className="profile-section">
        <img
          src={admin?.profilePic||"https://i.pravatar.cc/100?img=12"}
          alt="admin"
          className="profile-pic"
        />
        <span className="role-badge">Admin</span>
        <h3 className="name">{admin?.name||"admin"
          }</h3>
        <p className="email">{admin?.email||"admin@gmail.com"}</p>
      </div>

      <nav className="nav-links">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
        <li className='nav-link'>
        <span className='icon cursor-pointer'onClick={handlelogout} >↩️ logout</span>
          
        </li>
      </nav>
    </div>
  );
};

export default AdminSidebar;
