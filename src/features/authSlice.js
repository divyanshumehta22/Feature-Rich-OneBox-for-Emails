import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setUser, clearUser } from "./userSlice"; // Import fetchUser from userSlice
import {navigateTo} from '../utils/navigationService'

const initialState = {
    token: null,
    userId: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// Login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { dispatch }) => {
        const loginUserResponse = await fetch(`${import.meta.env.VITE_BURL}/user/create-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Header keys should be quoted, not the object itself
            },
            body: JSON.stringify({ email, password })
        });
        const userCredential = await loginUserResponse.json();
        // save token to localStorage
        localStorage.setItem("userToken", userCredential.token);
        // Fetch detailed user profile
        dispatch(setUser({_id : userCredential._id, name: userCredential.name, email: userCredential.email, password: userCredential.password, number: userCredential.number})); // Trigger userSlice action
        navigateTo('/')
        return { token: userCredential.token, userId };
    }
);

// Sign Up
export const registerUser = createAsyncThunk("auth/registerUser", async ({ email, password, name, number }) => {
   try {
    const createUserResponse = await fetch(`${import.meta.env.VITE_BURL}/user/register-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Header keys should be quoted, not the object itself
        },
        body: JSON.stringify({ name, email, password, number })
    });
   } catch (error) {
      console.log('Error while register user : '+error)
   }
});

// Logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { dispatch }) => {
    localStorage.removeItem('userToken');
    dispatch(clearUser()); // Clear userSlice state
    window.location.reload()
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserAuth: (state, action) => {
            const { token, userId } = action.payload;
            state.token = token;
            state.userId = userId;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload.token;
                state.userId = action.payload.userId;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.token = null;
                state.userId = null;
            });
    },
});

export default authSlice.reducer;
export const { setUserAuth } = authSlice.actions;