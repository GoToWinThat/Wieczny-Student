import { configureStore } from '@reduxjs/toolkit';
import MonopolyReducer from './monopolyReducer';

export default configureStore({
  reducer: {
    monopolyReducer: MonopolyReducer,
  },
});
