import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("user");
        if (serializedState === null) {
            return { isAuthenticated: false, user: null };
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return { isAuthenticated: false, user: null };
        
    }
}

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;  
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(state.user));
        },  
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("user");
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;