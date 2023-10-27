import { configureStore } from '@reduxjs/toolkit'
import photosDataReducer from './slices/photosData'
import filteringParamsReducer from './slices/filteringParams'

export const store = configureStore({
  reducer: {
    photosData: photosDataReducer,
    filteringParams: filteringParamsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
