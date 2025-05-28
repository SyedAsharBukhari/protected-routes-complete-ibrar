// src/Login.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {

 const [data, setdata] = useState({
  email: "",
  password: "",
 })
const inputhandler = (e) => {
  const { name, value } = e.target;
  setdata({...data, [name]: value });
};


const submit = (e) => {
    e.preventDefault()
console.log(data);

  }


  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" >Email address</label>
            <input type="email" name="email" className="form-control" id="email" onChange={inputhandler} placeholder="Enter email" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" className="form-control" id="password" onChange={inputhandler} placeholder="Password" />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
