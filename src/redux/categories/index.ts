import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux';
// import { api } from '../../../services'

import { CitiesState } from './types'

import axios from 'axios';
import { api } from '../../services';

const initialState: CitiesState = {
  loading: false,
  error: false,
  data: {
    count: 0,
    next: '',
    previous: '',
    results: []
  }
}

export const CategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setItems: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.data = {
        ...payload,
        results: payload?.results.map((item: any) => {
          return {
            ...item,
            value: String(item.id),
            label: String(item.title)
          }
        })
      }
    },
    setError: (state) => {
      state.error = true;
    },
    addItem: (state, { payload }) => {
      state.data.results.push({
        ...payload,
        value: String(payload.id),
        label: String(payload.title)
      });
    }
  },
})

// export the actions
export const { setLoading, setItems, setError, addItem } = CategoriesSlice.actions;


// // export the selector (".items" being same as in slices/index.js's "items: something")
// export const hotelsSelector = (state: { items: any }) => state.items;

// export the default reducer
export default CategoriesSlice.reducer;


// fetch all cities
export function fetchCities() {
  setLoading()
  return async (dispatch: Dispatch) => {
    api.get("categories/")
      .then((response) => {
        dispatch(setItems(response.data));
      })
      .catch((er) => {
        dispatch(setError());
      });
  };
}

// add new cities
// export function saveCity(data={}, setCity: any) {
//   return async (dispatch: Dispatch) => {
//     axios.post("/cities/", data)
//       .then((response) => {
//         dispatch(addItem(response.data));
//         setCity({
//           ...response.data,
//           value: String(response.data.id),
//           label: String(response.data.title)
//         })
//       })
//       .catch((er) => {
//         dispatch(setError());
//       });
//   };
// }