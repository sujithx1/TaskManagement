// src/pages/Login/Login.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../routes/user/userapicalls';
import { Alert, ErrorPayload, UserLogin_types } from '../../types/userside';
import { loginSuccess } from '../../reducers/usersidereducer';
import Notification from '../../components/notifications/Notification';
import LoadingScreen from '../../components/loading';
import { loginSuccess_admin } from '../../reducers/adminsidereducer';


interface LoginErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<UserLogin_types>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [alert,setAlert]=useState<Alert>({
    action:false,
    message:'',
    type:"idel",
   
  })
const navigate=useNavigate()
const dispatch:AppDispatch=useDispatch()
const [loading,setloading]=useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: LoginErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 characters';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('Login Successful:', formData);
    // Proceed with API call here
    setloading(true)
    dispatch(loginUser(formData)).unwrap()
    .then((res)=>{
      if(res.isAdmin){
        dispatch(loginSuccess_admin(res))
        navigate('/admin/home')
        return


      }
      dispatch(loginSuccess(res))
      setAlert({
        action:true,
        message:'success',
        type:'success'
      })
      setTimeout(() => {

        setloading(false)
        navigate('/home')

        
      }, 1000);

    })
    .catch((err:ErrorPayload)=>{
      setAlert({
        action:true,
        message:err.message,
        type:'error'
      })

    })
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


{
  loading && <LoadingScreen />
}
    <div className="container min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4 text-success">Login</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              name="email"
              id='email'
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              id='password'
              value={formData.password}
              onChange={handleChange}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-success w-100">
            Log In
          </button>
        </form>
      </div>
    </div>
              </>
  );
};

export default Login;
