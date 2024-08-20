import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const mainURL = 'https://full-stack-capstone-back-end.onrender.com/';
export const addNewVehicle = createAsyncThunk('car/addNewVehicle', async (formData) => {
  const response = await axios.post(`${mainURL}/api/v1/vehicles/`, {
    vehicle: formData,
  });
  return response.data;
});

const initialState = {
  data: [],
  status: 'idle',
  loading: false,
  error: null,
};

const addVehicleSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewVehicle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addMatcher(
        (action) => [addNewVehicle.rejected].includes(action.type),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          state.loading = false;
        },
      );
  },
});

export default addVehicleSlice.reducer;
