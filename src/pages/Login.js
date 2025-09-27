import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaStr = '';
    for (let i = 0; i < 6; i++) {
      captchaStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(captchaStr);
    setCaptchaError('');
    setCaptchaInput('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (captchaInput !== captcha) {
      setCaptchaError('Captcha is incorrect!');
      generateCaptcha();
      return;
    }

    dispatch(loginUser({ username, password }));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control mb-3"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
            required
          />

          {/* Captcha Display */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span 
              className="p-2 bg-light border rounded fw-bold"
              style={{ fontFamily: 'monospace', letterSpacing: '3px' }}
            >
              {captcha}
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={generateCaptcha}
            >
              Refresh
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter Captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="form-control mb-2"
            required
          />
          {captchaError && <p className="text-danger">{captchaError}</p>}

          <button type="submit" className="btn btn-primary w-100 mt-2" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
