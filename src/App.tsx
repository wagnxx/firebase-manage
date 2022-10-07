import React from 'react';
import './App.css';
import Home from './pages/home';
import Dashboard from './pages/google-drive/Dashboard';

import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom'
import Signup from './pages/Signup';
import { Container } from 'react-bootstrap';
import AuthContextProvider from './context/AuthContext';
import Login from './pages/Login';
import PrivateRoutes from './PrivateRoutes';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';
import Profile from './pages/Profile';


function App() {
  return (
    <Router>

      <AuthContextProvider>
        <div className="w-100">
          <Routes>

            <Route path='/' element={<PrivateRoutes />} >
              {/* Drive */}
              {/* <Route path='' element={<Home/>} /> */}
              <Route path="" element={<Dashboard />} />
              <Route path="/folder/:folderId" element={<Dashboard />} />

              {/* Profile */}
              <Route path="/user" element={<Profile />} />
              <Route path="update-profile" element={<UpdateProfile />} />
            </Route>

            {/* Auth */}
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="draggle" element={<Home />} />
          </Routes>



        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
