import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    on: (state) => {
      state.value = !state.value
    },
    off: (state) => {
      state.value = false;
    }
  },
})

export const { on ,off} = modalSlice.actions
export default modalSlice.reducer
