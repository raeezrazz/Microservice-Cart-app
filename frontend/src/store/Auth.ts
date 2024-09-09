import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthSlice {
    token: string | null;
    userId: string | null;
}

const initialState: AuthSlice = {
    token: localStorage.getItem('token') || null,
    userId: null,
};

const parseJwt = (token: string | null): string | null => {
    try {
        if (!token) return null;
        const base64Url = token.split('.')[1];
        if (!base64Url) return null;
        const base64 = atob(base64Url);
        const tokenPayload = JSON.parse(base64);
        return tokenPayload.userId || null;
    } catch (error) {
        console.error("Error parsing JWT token:", error);
        return null;
    }
};

const userIdFromToken = parseJwt(initialState.token);

const authSlice = createSlice({
    name: 'auth',
    initialState: { ...initialState, userId: userIdFromToken },
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            state.userId = parseJwt(action.payload);
        },
        clearToken(state) {
            state.token = null;
            localStorage.removeItem('token');
            state.userId = null;
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
