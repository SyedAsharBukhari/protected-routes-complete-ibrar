import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api_Handle } from '../../config/ApiHandle';


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      // const response = await axios.post(`${BASE_URL}/auth/login`, userData);
      const response = await Api_Handle.post("auth/login", userData)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);


export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      // const response = await axios.post(`${BASE_URL}/auth/signup`, userData);
      const response = await Api_Handle.post("auth/signup", userData)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (otpData, { rejectWithValue }) => {
    try {
      // const response = await axios.post(`${BASE_URL}/auth/verify-otp`, otpData); // Replace with exact path if needed
      const response = await Api_Handle.post("auth/verify-otp", otpData)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'OTP verification failed');
    }
  }
);
export const cehckAuth = createAsyncThunk(
  'checkAuthApi',
  async (otpData, { rejectWithValue }) => {
    try {
      // const response = await axios.post(`${BASE_URL}/auth/verify-otp`, otpData); // Replace with exact path if needed
      const response = await Api_Handle.get("user/get/me")
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'OTP verification failed');
    }
  }
);
