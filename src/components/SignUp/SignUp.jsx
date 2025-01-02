import styles from './Signup.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import axios from '../../api/axios.js';

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [authError, setAuthError] = useState(false)
  const [authSuccess, setAuthSuccess] = useState(false)
  const [authErrorMessage, setAuthErrorMessage] = useState('')
  const [authSuccessMessage, setAuthSuccessMessage] = useState('')


  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setAuthError(false)
      setAuthSuccess(false)
      setAuthErrorMessage('')
      setAuthSuccessMessage('')

      const res = await axios.post('/auth/register', { data })
      if (res?.status === 200) {
        setAuthSuccess(true)
        setAuthSuccessMessage(res?.data?.message)
        setTimeout(() => {
          navigate('/auth/login')
        }, 1000)
      }
      console.log(res)
    } catch (error) {
      setAuthError(true)
      setAuthErrorMessage(error?.response?.data?.message)
      console.log(error)
    }
  };

  return (
    <div className={styles.signupContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.signupForm}>
        {authError && <p className={styles.authError}>{authErrorMessage}</p>}
        {authSuccess && <p className={styles.authSuccess}>{authSuccessMessage}</p>}

        <div className={styles.formGroup}>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            {...register('fullName', { required: 'Full Name is required' })}
          />
          {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <div className={styles.passwordContainer}>
            <input
              id="password"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password', { required: 'Password is required' })}
            />
            <button type="button" onClick={togglePasswordVisibility} className={styles.toggleButton}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className={styles.passwordContainer}>
            <input
              id="confirmPassword"
              type={confirmPasswordVisible ? 'text' : 'password'}
              placeholder="Re-enter your password"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: value => value === watch('password') || 'Passwords do not match',
              })}
            />
            <button type="button" onClick={toggleConfirmPasswordVisibility} className={styles.toggleButton}>
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" className={styles.submitButton}>Register</button>
        <p className={styles.loginLink}>
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
