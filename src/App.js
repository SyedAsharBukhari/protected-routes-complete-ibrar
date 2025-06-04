import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';

import { cehckAuth } from './Features/Slice/fetch';
import { isLoginIdle } from './Features/Slice/Slice';

// Route Guards
const PublicRoute = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? <Navigate to="/dashboard" /> : <Outlet />;
};

const PrivateRoute = () => {
  const { isAuth, } = useSelector((state) => state.auth);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const { cehckAuth_loading, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cehckAuth());
  }, [dispatch]);


  useEffect(() => {
    if (status === "succeeded") {
      dispatch(cehckAuth());
      dispatch(isLoginIdle())
    }
  }, [status])


  // Route configuration
  const routes = [
    {
      path: "/login",
      element: <Login />,
      auth: false,
    },
    {
      path: "/signup",
      element: <Signup />,
      auth: false,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      auth: true,
    },
  ];

  if (cehckAuth_loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>

          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            {routes
              .map(({ path, element, auth }) => (
                auth === false && <Route key={path} path={path} element={element} />
              ))}
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            {routes
              .map(({ path, element, auth }) => (
                auth === true && <Route key={path} path={path} element={element} />
              ))}
          </Route>

          {/* Default route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
