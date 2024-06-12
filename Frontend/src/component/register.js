import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />
        </div>
        <button type="submit">Register</button>
      </form>
      <Link to="/sign-in">Login</Link>
      <Link to="/order-create">ProductList</Link>
    </div>
  );
}

export default Register;
