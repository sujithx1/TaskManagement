import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Adminsidebar.scss'; // you can style this with SCSS or CSS

const navItems = [
  { label: 'Dashboard', path: '/admin/home', icon: '📊' },
  { label: 'Manage Tasks', path: '/admin/tasks', icon: '✅' },
  { label: 'Create Task', path: '/admin/create-task', icon: '➕' },
  { label: 'Team Members', path: '/admin/team', icon: '👥' },
  { label: 'Logout', path: '/logout', icon: '↩️' },
];

const AdminSidebar: FC = () => {
  const location = useLocation();

  return (
    <div className="admin-sidebar">
      <h2 className="logo">Task Manager</h2>
      <div className="profile-section">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="admin"
          className="profile-pic"
        />
        <span className="role-badge">Admin</span>
        <h3 className="name">Mike</h3>
        <p className="email">mike@timetoprogram.com</p>
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
      </nav>
    </div>
  );
};

export default AdminSidebar;
