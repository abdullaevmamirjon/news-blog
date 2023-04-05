import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ProfileIcon } from './svg';

const SideBar = () => {
  const [activeBtn, setActiveBtn] = React.useState<any>(1);

  const handleClick = (index: any) => {
    setActiveBtn(index);
  };
  return (
    <div className="SideBar">
      <div>
        <Link to="/">
          <div
            onClick={() => handleClick(1)}
            className={activeBtn === 1 ? 'onhover active' : 'onhover'}>
            <HomeIcon />
            <div>HomePAge</div>
          </div>
        </Link>
        <Link to="profile">
          <div className={'onhover'}>
            <ProfileIcon />
            <div>Profile</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
