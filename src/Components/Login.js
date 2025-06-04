import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Features/Slice/fetch';

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(state => state.auth);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(loginUser(data));
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" id="email" onChange={inputHandler} placeholder="Enter email" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" className="form-control" id="password" onChange={inputHandler} placeholder="Password" />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <div className="text-danger mt-2 text-center">{error}</div>}
          {user && <div className="text-success mt-2 text-center">Login Successful</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
