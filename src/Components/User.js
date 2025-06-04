import React from 'react'
import { Link, Navigate, Outlet, Route } from 'react-router-dom'
import Login from './Login';

const User = () => {
  const verified = true;
  return (
    <div>
      {verified ? <Outlet /> : <Navigate to={"/login"} />}
    </div>
  )
}

export default User