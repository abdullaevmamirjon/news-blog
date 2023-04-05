import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import { UserIcon } from './svg';

type Props = {};

const Header = (props: Props) => {
  const { profile } = useAppSelector((state) => state);

  return (
    <div className="Header">
      <div className="Header__inner">
        <div className="Header__title">News-Blog</div>
        <Link to="profile">
          <div className="Header__profile">
            <div className="Header__profile-title">
              <div>{profile?.data?.last_name}</div>
              <div>{profile?.data?.first_name}</div>
            </div>
            <UserIcon />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
