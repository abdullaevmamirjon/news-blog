import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dispatch } from 'redux';

import { ProfileState } from './types';
import { api } from '../../services/index';

const token = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token') || '')
  : undefined;

const initialState: ProfileState = {
  loading: false,
  error: false,
  data: token ? token : undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setItems: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.data = payload;
    },

    setErrors(state, { payload }) {
      state.error = payload;
    },
    editItem: (state, { payload }) => {
      state.error = false;
      state.data = payload;
    },
    editPaswd(state, { payload }) {
      state.error = false;
      state.data = payload;
    },
  },
});

export const { setItems, editItem, editPaswd, setErrors } = profileSlice.actions;

export default profileSlice.reducer;

//registration
export function Registration(data = {}, setError: any) {
  return async (dispatch: Dispatch) => {
    axios
      .post(
        'http://orozkg.pythonanywhere.com/api/v1/auth/register/',
        data,
      )
      .then((response) => {
        dispatch(setItems(response.data));
        localStorage.setItem('profile', JSON.stringify(response));
        window.location.replace('/signIn');
      })
      .catch((er) => {
        dispatch(setError(er.response));
      });
  };
}

//Login
export function LogIn(data = {}, setError: any) {
  return async (dispatch: Dispatch) => {
    api
      .post('auth/login/', data, {})
      .then((response) => {
        dispatch(setItems(response.data));
        if (response.data.token !== undefined) {
          localStorage.setItem('token', JSON.stringify(response.data.token));
          window.location.replace('/');
        }
      })
      .catch((er) => {
        dispatch(setError(er.response));
      });
  };
}

//fetchProfile
export function FetchProfile() {
  return async (dispatch: Dispatch) => {
    api
      .get('auth/profile/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        dispatch(setItems(res.data));
      })
      .catch((er) => {
        dispatch(setErrors(er));
      });
  };
}

//editProfile
export function EditProfile(data = {}, setError: any, setIsEdit: any) {
  return async (dispatch: Dispatch) => {
    api
      .patch('auth/profile/', data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response: any) => {
        dispatch(editItem(response.data));
        setIsEdit(false);
      })
      .catch((er) => {
        dispatch(setError(er.response));
      });
  };
}

//editPassword
export function EditPassword(data = {}, setError: any, setIsEdit: any) {
  return async (dispatch: Dispatch) => {
    api
      .post('auth/change-password/', data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response: any) => {
        dispatch(editPaswd(response.data));
        setIsEdit(false);
      })
      .catch((er) => {
        dispatch(setError(er.response));
      });
  };
}
