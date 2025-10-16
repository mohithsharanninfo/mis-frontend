import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 selectedStylecodes:[]
};

const sliceData = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedStylecodes: (state, action) => {
      state.selectedStylecodes = action.payload;
    },
  },
});

export const {setSelectedStylecodes} = sliceData.actions;

export default sliceData.reducer;
