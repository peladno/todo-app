import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  task: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extrareducers: {},
});

export default todoSlice.reducer;
