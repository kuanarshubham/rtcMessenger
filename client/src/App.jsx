import { Routes, Route, Navigate } from "react-router-dom";
import {Loader} from 'lucide-react';

import './App.css';
import Navbar from './components/Navbar.jsx';
import Homepage from './pages/HomePage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import useAuthStore from './store/useAuthStore.js';
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import useThemeStore from "./store/useThemeStore.js";

function App() {

  const routes = [
    {
      path: '/',
      element: <Homepage />
    },

    {
      path: '/signup',
      element: <SignupPage />
    },

    {
      path: '/login',
      element: <LoginPage />
    },

    {
      path: '/settings',
      element: <SettingsPage />
    },

    {
      path: '/profile',
      element: <ProfilePage />
    }
  ];

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

 

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth && !authUser) return <Loader  className="size-10 animate-spin"/>

  return (
    <div>

      <Navbar />

      <Routes>
        <Route path='/' element={authUser? <Homepage />: <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignupPage />: <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage />: <Navigate to="/" />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser? <ProfilePage />: <Navigate to="/login" />} />
      </Routes>

      <Toaster />

    </div>
  )
}

export default App