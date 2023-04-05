import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import MainLayout from './pages/MainLayout';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import { Index } from './pages/profile/index';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="profile" element={<Index />} />
        </Route>
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
