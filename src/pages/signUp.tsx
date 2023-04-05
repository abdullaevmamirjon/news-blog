import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../redux/store';
import { Registration } from '../redux/profile/index';

type Inputs = {
  first_name: string;
  last_name: string;
  username: any;
  password: string;
  password_confirm: string;
  email: string;
};

const SignUp = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<any>();
  const [navigate, setNavigate] = useState(false);
  let Navigates = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      Registration(
        {
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
          password: data.password,
          password_confirm: data.password_confirm,
          email: data.email,
        },
        setError,
      ),
    );
   
  };

  if (navigate) {
    Navigates('/signIn');
  }
  return (
    <>
      <div className="SignUp">
        <div className="SignUp__content">
          <div className="SignUp__content-title">Регистрация</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="SignIn__content-input--title">Наришите ваше имя</div>
              <input {...register('first_name', { required: true })} type="text" />
            </div>
            <div>
              <div className="SignIn__content-input--title">Наришите вашу фамилию</div>
              <input {...register('last_name', { required: true })} type="text" />
            </div>
            <div>
              <div className="SignIn__content-input--title">Наришие своё погоняло </div>
              <input {...register('username', { required: true })} type="text" />
              <div className="error">{error ? error?.data.username : null}</div>
            </div>
            <div>
              <div className="SignIn__content-input--title">Создайте пароль</div>
              <div>
                <input
                  {...register('password', {
                    required: true,
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
                    required: true,
                    minLength: { value: 8, message: 'Минимум 8 символов' },
                  })}
                  type="password"
                />

                <div className="error">{error ? error?.data.password_confirm : null}</div>
              </div>
            </div>
            <div>
              <div className="SignIn__content-input--title">Наришите ваш email</div>
              <input {...register('email', { required: true })} type="email" />
              <div className="error">{error ? error?.data.email : null}</div>
            </div>

            <div className="btn">
              <button className="button">Зарегистрироваться</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
