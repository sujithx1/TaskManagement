import React, { useState } from 'react';
import { UserSignUpTypes } from '../../types/userside';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../routes/user/userapicalls';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<UserSignUpTypes>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  });

  const [errors, setErrors] = useState<UserSignUpTypes>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  }); 

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: ''
    };

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (
      formData.password.length < 8 ||
      !/[a-z]/.test(formData.password) ||
      !/[A-Z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password) ||
      !/[!@#$%^&*]/.test(formData.password)
    ) {
      newErrors.password =
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
    }

    if (!formData.confirm_password.trim()) {
      newErrors.confirm_password = 'Confirm password is required';
    } else if (formData.confirm_password !== formData.password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.values(validationErrors).some(error => error !== '')) {
      setErrors(validationErrors);
      return;
    }

    dispatch(signupUser(formData))
      .unwrap()
      .then(() => {
        navigate('/login');
      });

    setFormData({ name: '', email: '', phone: '', password: '', confirm_password: '' });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <form onSubmit={handleSubmit} className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="mb-4 text-center">Create Account</h3>

        {['name', 'email', 'phone', 'password', 'confirm_password'].map((field, index) => (
          <div className="mb-3" key={index}>
            <label className="form-label">{field.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}</label>
            <input
              type={field.includes('password') ? 'password' : 'text'}
              className={`form-control ${errors[field as keyof UserSignUpTypes] ? 'is-invalid' : ''}`}
              name={field}
              value={formData[field as keyof UserSignUpTypes]}
              onChange={handleChange}
            />
            {errors[field as keyof UserSignUpTypes] && (
              <div className="invalid-feedback">{errors[field as keyof UserSignUpTypes]}</div>
            )}
          </div>
        ))}

        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
