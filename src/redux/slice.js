import { createSlice } from '@reduxjs/toolkit';
import { startOfDay, endOfDay, format } from 'date-fns';

const today = new Date();
const formattedStart = format(startOfDay(today), "yyyy-MM-dd HH:mm:ss.SSS");
const formattedEnd = format(endOfDay(today), "yyyy-MM-dd HH:mm:ss.SSS");

const initialState = {
  selectedStylecodes: [],
  startDate: formattedStart, 
  endDate: formattedEnd,     

};

const sliceData = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedStylecodes: (state, action) => {
      state.selectedStylecodes = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
});

export const { setSelectedStylecodes,setStartDate,setEndDate } = sliceData.actions;

export default sliceData.reducer;
