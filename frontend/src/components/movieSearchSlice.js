import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0

};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        show: (state) => {
            state.value = (state.value === 0) ? 1 : 0;
        },

    }
})
export const { show } = searchSlice.actions;
export default searchSlice.reducer;