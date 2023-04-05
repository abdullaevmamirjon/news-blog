import React from 'react';
import { Outlet } from 'react-router-dom';

type Props = {};

const Components = (props: Props) => {
  return (
    <div className='Components'>
      <Outlet />
    </div>
  );
};

export default Components;
