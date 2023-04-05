import React from 'react';
import Components from '../components/components';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

const MainLayout = () => {
  return (
    <div className="MainLayout">
      <SideBar />
      <div className="MainLayout_outlet">
        <Header />
        <Components />
      </div>
    </div>
  );
};

export default MainLayout;
