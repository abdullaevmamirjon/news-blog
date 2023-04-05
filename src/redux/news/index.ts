import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { api } from '../../services';
import { NewsType } from './types';

const initialState: NewsType = {
  loading: false,
  error: false,
  data: [],
};

const token = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token') || '')
  : undefined;

const NewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setItems(state, { payload }) {
      state.loading = false;
      state.error = false;
      state.data = payload;
    },
    addItem(state, { payload }) {
      state.data.push({payload})
      console.log(state);
    },
    setErrors(state, { payload }) {
      state.error = payload;
      state.loading = false;
    },
    setIsedit(state, { payload }) {
      state.data = payload;
    },
    deleteItem(state, { payload }) {
      state.data = state.data.filter((item: any) => item.id !== payload);
    },
  },
});

export const { setItems, setErrors, setIsedit, deleteItem, addItem } = NewsSlice.actions;

export default NewsSlice.reducer;

// fetchNews
export const FetchNews = () => {
  return async (dispatch: Dispatch) => {
    api
      .get('news/')
      .then((response: any) => {
        dispatch(setItems(response.data));
      })
      .catch((er) => {
        dispatch(setErrors(er));
      });
  };
};

export const EditNews = (data = {}, setIsEditable: any, id: number) => {
  return async (dispatch: Dispatch) => {
    api
      .patch(`news/${id}/`, data, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      .then((respnse: any) => {
        dispatch(setIsedit(respnse.data));
        setIsEditable(true);
      })
      .catch((er) => {
        dispatch(setErrors(er.detail));
      });
  };
};

export const DeleteNews = (id: number) => {
  return async (dispatch: Dispatch) => {
    api
      .delete(`news/${id}/`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      .then((response: any) => {
        dispatch(deleteItem(response.data));
      })
      .catch((er) => {
        dispatch(setErrors(er.detail));
      });
  };
};

export const AddNews = (data: any, fetch: boolean, setFetch: React.Dispatch<React.SetStateAction<boolean>>) => {
  return async (dispatch: Dispatch) => {
    api
      .post(`news/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        },
      })
      .then((response: any) => {
        setFetch(!fetch)
      })
      .catch((er) => {
        dispatch(setErrors(er.detail));
      });
  };
};
