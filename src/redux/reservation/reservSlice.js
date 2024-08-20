/* eslint-disable max-len */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = 'https://full-stack-capstone-back-end.onrender.com/api/v1/reservations/';

// Thunks
export const fetchReservations = createAsyncThunk(
  'reservation/fetchReservations',
  async () => {
    const response = await axios.get(apiURL);
    return response.data;
  },
);

export const addReservation = createAsyncThunk(
  'reservation/addReservation',
  async (formData) => {
    const response = await axios.post(apiURL, {
      reservation: formData,
    }); // Assuming your API expects the reservation data wrapped in "reservation" object
    const data = await response.json();
    return data;
  },
);

export const deleteReservation = createAsyncThunk(
  'reservation/deleteReservation',
  async (reservId) => {
    const response = await axios.delete(apiURL + reservId);
    const data = await response.json();
    return data;
  },
);

// Initial state
const initialState = {
  reservations: [],
  isLoading: false,
  error: null,
};

// Slice
const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addReservation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteReservation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservations = action.payload;
      })
      .addCase(addReservation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservations = state.data.filter(
          (reserv) => reserv.id !== action.payload,
        );
      })
      .addMatcher(
        (action) => [
          fetchReservations.rejected,
          addReservation.rejected,
          deleteReservation.rejected,
        ].includes(action.type),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        },
      );
  },
});

export default reservationSlice.reducer;
