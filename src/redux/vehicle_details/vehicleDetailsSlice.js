import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchVehicleDetails = createAsyncThunk(
  'vehicleDetails/getVehicleDetails',
  async (vehicleId) => {
    const response = await fetch(`https://full-stack-capstone-back-end.onrender.com/api/v1/vehicles/${vehicleId}`);
    const data = await response.json();
    console.log(data);
    return data;
  },
);

const vehicleDetailsSlice = createSlice({
  name: 'vehicleDetails',
  initialState: {
    details: {},
    status: 'loading',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVehicleDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchVehicleDetails.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default vehicleDetailsSlice.reducer;
