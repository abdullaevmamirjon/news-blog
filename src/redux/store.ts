import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import profile from './profile/index';
import news from './news/index';
import categories from './categories/index';
import tags from './tags/index';

export const store = configureStore({
  reducer: {
    profile,
    news,
    categories,
    tags
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
