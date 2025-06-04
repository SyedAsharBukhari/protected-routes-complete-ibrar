import { createSlice } from '@reduxjs/toolkit';
import { cehckAuth, loginUser, signupUser, verifyOtp } from './fetch';
import { USER_AUTH_TOKEN } from '../../utils/tokenVariables';



const Slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    success: null,
    otpVerified: false,
    otpMessage: null,
    isAuth: false,
    cehckAuth_loading: false
  },
  reducers: {
    resetOtpState: (state) => {
      state.otpVerified = false;
      state.otpMessage = null;
    },
    isLoginIdle: (state) => {
      state.status = "idle"
    }
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading"
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.status = "succeeded"
        localStorage.setItem(USER_AUTH_TOKEN, action.payload?.data?.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed"
        state.error = action.payload;
      })

      // Signup
      .addCase(signupUser.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem(USER_AUTH_TOKEN, action.payload?.data?.token)

        state.success = 'Signup successful!';
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // OTP Verification
      .addCase(verifyOtp.pending, state => {
        state.loading = true;
        state.error = null;
        state.otpMessage = null;
        state.otpVerified = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpMessage = action.payload.message || 'OTP Verified Successfully!';
        state.otpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.otpMessage = action.payload || 'OTP Verification Failed';
        state.otpVerified = false;
      })


      // user auth
      .addCase(cehckAuth.pending, state => {
        state.cehckAuth_loading = true;
        state.cehckAuth_error = null;
        state.cehckAuth_success = null;
        state.isAuth = false
      })
      .addCase(cehckAuth.fulfilled, (state, action) => {
        state.cehckAuth_loading = false;
        state.user = action.payload;
        state.isAuth = action.payload?.data?.verified

        state.cehckAuth_success = 'Signup successful!';
      })
      .addCase(cehckAuth.rejected, (state, action) => {
        state.cehckAuth_loading = false;
        state.isAuth = false
        state.cehckAuth_error = action.payload;
      })
  },
});

export const { resetOtpState, isLoginIdle } = Slice.actions;
export default Slice.reducer;
