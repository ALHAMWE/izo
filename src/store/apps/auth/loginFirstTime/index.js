import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import notify from '../../../../utils/notify.jsx'
import axios from 'axios'
import { setCookie } from 'cookies-next'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  statusCode: '',
  message: '',
  api_url: '',
  database: ''
}

// Define an async thunk action to handle loginFirstTime
export const loginFirstTime = createAsyncThunk('feature/loginFirstTime', async loginFirstTimeData => {
  try {
    const response = await axios.post('https://admin.izocloud.com/api/app/front/login', loginFirstTimeData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error) {
    return response.data
  }
})

// Create the loginFirstTime slice
export const loginFirstTimeSlice = createSlice({
  name: 'loginFirstTime',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginFirstTime.fulfilled, (state, action) => {
        state.data = action.payload
        state.statusCode = action.payload.status
        state.message = action.payload.message
        state.api_url = action.payload.api_url
        state.database = action.payload.database
        state.status = 'success'
        setCookie('DatabaseConnection', action.payload?.database)
        setCookie('ApiUrl', action.payload?.api_url)

        notify('Login for first time Successfully', 'success')
      })
      .addCase(loginFirstTime.pending, state => {
        state.status = 'pending'
      })
      .addCase(loginFirstTime.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
        notify('There is an Error try again!', 'error')
      })
  }
})

// Export actions and reducer
export const { getToken } = loginFirstTimeSlice.actions
export default loginFirstTimeSlice.reducer
