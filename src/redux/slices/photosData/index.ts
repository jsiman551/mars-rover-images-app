import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface photosDataState {
  value: Array<Object>
  loading: boolean
  pageNumber: number
}

// Define the initial state using that type
const initialState: photosDataState = {
  value: [],
  loading: false,
  pageNumber: 1,
}

export const photosDataSlice = createSlice({
  name: 'photosData',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getStarted: (state) => {
      state.loading = true
    },
    getDataSuccess: (state, action: PayloadAction<object[]>) => {
      state.loading = false
      state.value = action.payload
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload
    },
  },
})

export const { getStarted, getDataSuccess } = photosDataSlice.actions
export default photosDataSlice.reducer
