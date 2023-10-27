import { roversNames } from '@/contants'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const [curiosity] = roversNames

interface filteringParamsState {
  cameraName: string
  earthDate: string
  solDate: number | string
  roverName: string
  isQueryBySol: boolean
}

// Define the initial state using that type
const initialState: filteringParamsState = {
  cameraName: '',
  earthDate: '2015-6-3',
  solDate: 1000,
  roverName: curiosity,
  isQueryBySol: false,
}

export const filteringParamsSlice = createSlice({
  name: 'filteringParams',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCameraName: (state, action: PayloadAction<string>) => {
      state.cameraName = action.payload
    },
    setEarthDate: (state, action: PayloadAction<string>) => {
      state.earthDate = action.payload
    },
    setSolDate: (state, action: PayloadAction<number | string>) => {
      state.solDate = action.payload
    },
    setRoverName: (state, action: PayloadAction<string>) => {
      state.roverName = action.payload
    },
    setIsQueryBySol: (state, action: PayloadAction<boolean>) => {
      state.isQueryBySol = action.payload
    },
  },
})

export const {
  setCameraName,
  setEarthDate,
  setSolDate,
  setRoverName,
  setIsQueryBySol,
} = filteringParamsSlice.actions
export default filteringParamsSlice.reducer
