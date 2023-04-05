import React, { SetStateAction } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { EditIcon, LogoutIcon, NoProfileImage } from '../../components/svg';
import { FetchProfile } from '../../redux/profile';
import { useAppDispatch, useAppSelector } from '../../redux/store';

interface Props {
  setIsEdit: React.Dispatch<SetStateAction<boolean>>;
}

const Profile = ({ setIsEdit }: Props) => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state);

  const token = localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token') || '')
    : undefined;

  React.useEffect(() => {
    dispatch(FetchProfile());
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    window.location.replace('/signIn');
  };

  if (token) {
    return (
      <div className="Profile">
        <div className="Profile__avatar">
          <NoProfileImage />
        </div>
        <div className="Profile__desc">
          <div className="Profile__info">
            <div>{profile.data.last_name}</div>
            <div>{profile.data.first_name}</div>
            <button onClick={() => setIsEdit(true)}>
              <EditIcon />
            </button>
          </div>
          <div className="Profile__email">{profile.data.email}</div>
          <button onClick={() => logOut()}>
            <div>
              <LogoutIcon />
            </div>
            Выйти из аккаунта
          </button>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/signIn" replace={true} />;
  }
};

export default Profile;
