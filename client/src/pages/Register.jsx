// client/src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import { authService } from '../services/authService';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await authService.register(data);
      toast.success('Registration successful! Welcome to BookHub!');
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Registration failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>
            <FaUserPlus /> Create Account
          </h2>
          <p>Join BookHub and start managing your book collection</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label>
              <FaUser /> Full Name
            </label>
            <input
              type="text"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                }
              })}
              placeholder="John Doe"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>
              <FaEnvelope /> Email Address
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="you@example.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <FaLock /> Password
              </label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                placeholder="••••••••"
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>
                <FaLock /> Confirm Password
              </label>
              <input
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                placeholder="••••••••"
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              {errors.confirmPassword && (
                <span className="error-message">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              id="terms"
              {...register('terms', {
                required: 'You must accept the terms and conditions'
              })}
            />
            <label htmlFor="terms">
              I agree to the{' '}
              <Link to="/terms" className="link">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="link">
                Privacy Policy
              </Link>
            </label>
            {errors.terms && (
              <span className="error-message">{errors.terms.message}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="auth-btn" 
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Creating Account...
              </>
            ) : (
              <>
                <FaUserPlus /> Register
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;