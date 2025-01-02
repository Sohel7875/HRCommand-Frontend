import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from '../SignUp/Signup.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import axios from '../../api/axios.js'
import useAuth from '../../hooks/useAuth.jsx'

const Login = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

const {setAuth,auth} = useAuth()

  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [authError, setAuthError] = useState(false)
  



  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const onSubmit = async (data) => {
    try {
      setAuthError(false)

      const res = await axios.post('/auth/login', { data }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

      if (res?.status === 201) {
        const {accessToken,user} = res?.data
        setAuth({ user, accessToken })
        navigate(from, { replace: true })

      }
    } catch (error) {
      setAuthError(true)
      console.log(error)
    }
  };


  return (
    <div className={styles.signupContainer}>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.signupForm}>
        {authError && <p className={styles.authError}>Invalid credentials. Please try again.</p>}
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

        <div className={styles.loginAndForgotPassword}>
          <p className={styles.forgotPassword}>
            <Link to="/auth/forgot-password">Forgot password?</Link>
          </p>

          <button type="submit" className={styles.loginButton}>Log In</button>
        </div>



        <p className={styles.loginLink}>
          Don’t have an account? <Link to="/auth/signup">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
