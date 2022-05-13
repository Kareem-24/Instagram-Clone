import { configureStore } from '@reduxjs/toolkit'
  import modalReducer from './features/modal/modalReducer'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
}) 
