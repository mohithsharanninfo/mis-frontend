import { configureStore } from '@reduxjs/toolkit'
import sliceData from '../redux/slice'

 export const store = configureStore({
  reducer: {sliceData},
})