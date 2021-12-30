import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';

import houseSlice from '../components/House/houseSlice'
import userSlice from '../authentication/userSlice'



// Reducers
const rootReducer = combineReducers({
  houses: houseSlice,
  user: userSlice
})

// Store
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

// Select / Dispatch hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;