import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,

};

export const landingSlice = createSlice({
    name: 'landing',
    initialState,
    reducers: {
        register: (state) => {
            state.value = 1;
        },
        login: (state) => {
            state.value = 0;
        },
    }
})
export const { register, login } = landingSlice.actions;
export default landingSlice.reducer;