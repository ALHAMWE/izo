import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next'

// Async thunk for fetching the data
export const fetchEntryPurchase = createAsyncThunk('purchase/entry', async payload => {
  const token       = getCookie('token')
  const url         = getCookie('apiUrl')
  const database    = getCookie('DatabaseConnection')
  const { id } = payload
  const response = await axios.get(`${url}/app/react/purchase/entry/${id}`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' ,
      database:  `${database}`,}
  })

  return response.data
})

// Initial state
const initialState = {
  data: [],
  status: 'idle',
  error: null
}

// Slice
const getEntryPurchase = createSlice({
  name: 'entryPurchase',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEntryPurchase.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchEntryPurchase.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchEntryPurchase.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default getEntryPurchase.reducer
