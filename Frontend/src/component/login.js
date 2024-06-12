import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import acceptedCredentials from './credentials'; // Adjust the path as necessary

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the entered email and password match any in the acceptedCredentials list
    const user = acceptedCredentials.find(
      (cred) => cred.email === email && cred.password === password
    );

    if (user) {
      setError('');
      // Redirect based on the role
      if (user.role === 'admin') {
        navigate('/productlist');
      } else if (user.role === 'customer') {
        navigate('/order-create');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h2>Login</h2>
        <p>Welcome to our shopping website. Please login to continue to your dashboard and explore our products and services.</p>
      </div>
      <div className="right-section">
        <div className="login-box">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
          </form>
          {/* <Link to="/">Register</Link>
          <Link to="/productlist">ProductList</Link> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
