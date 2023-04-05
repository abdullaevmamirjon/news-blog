import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from '../redux/store';
import { LogIn } from '../redux/profile';

type InputData = {
  username: any;
  password: string;
};

const SignIn = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<any>();
  const [navigate, setNavigate] = useState(false);
  let Navigates = useNavigate();

  const token = localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token') || '')
    : undefined;

  const { register, handleSubmit, reset } = useForm<InputData>();
  const onSubmit: SubmitHandler<InputData> = (data) => {
    dispatch(
      LogIn(
        {
          username: data.username,
          password: data.password,
        },
        setError,
      ),
    );
    if (token) {
      setNavigate(true);
    }
  };

  if (navigate) {
    Navigates('/');
  }
  if (!token) {
    return (
      <div className="SignIn">
        <div className="SignIn__content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="SignIn__content-input--title">Ваше имя</div>
              <input {...register('username', { required: true })} type="text" />
              <div className="error">{error ? error?.data.username : null}</div>
            </div>
            <div>
              <div className="SignIn__content-input--title">Ваш пароль</div>
              <input {...register('password', { required: true })} type="password" />
            </div>
            <div className="btn">
              <Link to="/signUp">
                <button className="btn_register">Зарегистрироваться</button>
              </Link>
              <button type="submit" className="button">
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navigate replace={true} to="/" />
      </div>
    );
  }
};

export default SignIn;
