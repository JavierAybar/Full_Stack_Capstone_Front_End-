import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://full-stack-capstone-back-end.onrender.com/api/v1';

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async () => {
  const response = await axios.get(`${url}/vehicles`);
  return response.data;
});

export const deleteVehicle = createAsyncThunk('vehicles/deleteVehicle', async (id) => {
  await axios.delete(`${url}/vehicles/${id}`);
});

const initialState = {
  vehicle: [],
  isLoading: false,
  error: null,
};

const vehiclesSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vehicle = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.vehicle = state.vehicle.filter((vehicle) => vehicle.id !== action.meta.arg);
      });
  },
});
export default vehiclesSlice.reducer;
