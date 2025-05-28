import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './Components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import { About } from './Components/About';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import User from './Components/User';


function App() {
  return (
    <div className="App">
<BrowserRouter>
<Navbar/>
<Routes>
  <Route path={"/"} element={<Home/>}/>
  <Route path={"/about"} element={<About/>}/>
  <Route path={"/login"} element={<Login/>}/>
  <Route path={"/signup"} element={<Signup/>}/>

<Route path={"/user"} element={<User/>}>
  <Route path={"profile"} element={<Profile/>}/>
  <Route path={"dashboard"} element={<Dashboard/>}/>
</Route>
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
