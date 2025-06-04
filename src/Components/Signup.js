import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../Features/Slice/fetch';

function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.auth);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(signupUser(data));

  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Sign Up</h3>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" name="name" className="form-control" id="name" onChange={inputHandler} placeholder="Enter name" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" id="email" onChange={inputHandler} placeholder="Enter email" />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input type="text" name="phone" className="form-control" id="phone" onChange={inputHandler} placeholder="Enter phone number" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" className="form-control" id="password" onChange={inputHandler} placeholder="Password" />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" name="confirmPassword" className="form-control" id="confirmPassword" onChange={inputHandler} placeholder="Confirm Password" />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {error && <div className="text-danger text-center mt-3">{error}</div>}
          {success && <div className="text-success text-center mt-3">{success}</div>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
