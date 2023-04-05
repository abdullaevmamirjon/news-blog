import React, { SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EditPassword, EditProfile } from '../../redux/profile';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { NoProfileImage } from '../../components/svg';

interface Props {
  setIsEdit: React.Dispatch<SetStateAction<boolean>>;
}

type Types = {
  first_name: string;
  last_name: string;
  username: any;
  password: string;
  password_confirm: string;
  old_password: any;
};

const ProfileEdit = ({ setIsEdit }: Props) => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state);
  const [error, setError] = React.useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Types>();
  const onSubmit: SubmitHandler<Types> = (data) => {
    dispatch(
      EditProfile(
        {
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
        },
        setError,
        setIsEdit,
      ),
    );

    dispatch(
      EditPassword(
        {
          old_password: data.old_password,
          password: data.password,
          password_confirm: data.password_confirm,
        },
        setError,
        setIsEdit,
      ),
    );
  };
  return (
    <div className="ProfileEdit">
      <NoProfileImage />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="ProfileEdit-input--title">Наришите ваше имя</div>
          <input defaultValue={profile.data.first_name} {...register('first_name')} type="text" />
        </div>
        <div>
          <div className="SignIn__content-input--title">Наришите вашу фамилию</div>
          <input defaultValue={profile.data.last_name} {...register('last_name')} type="text" />
        </div>
        <div>
          <div className="SignIn__content-input--title">Наришие своё погоняло </div>
          <input defaultValue={profile.data.username} {...register('username')} type="text" />
          <div className="error">{error ? error?.data.username : null}</div>
        </div>
        <div>
          <div className="SignIn__content-input--title">old pswd</div>
          <div>
            <input
              {...register('old_password', {
                minLength: { value: 8, message: 'Минимум 8 символов' },
              })}
              type="password"
            />
          </div>
          <div className="error">{error ? error?.data.old_password : null}</div>
        </div>
        <div>
          <div className="SignIn__content-input--title">Создайте пароль</div>
          <div>
            <input
              {...register('password', {
                minLength: { value: 8, message: 'Минимум 8 символов' },
              })}
              type="password"
            />
            <div>{errors.password && <span className="error">Минимум 8 символов</span>}</div>
          </div>
        </div>
        <div>
          <div className="SignIn__content-input--title">Подтвердите пароль</div>
          <div>
            <input
              {...register('password_confirm', {
                minLength: { value: 8, message: 'Минимум 8 символов' },
              })}
              type="password"
            />
            <div className="error">{error ? error?.data.password_confirm : null}</div>
          </div>
        </div>
        <button className="button">Подтвердить</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
