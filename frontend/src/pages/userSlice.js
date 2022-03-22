import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value: 0,
    id: '',
    userName: '',
    email: ''

};
// "_id": "622c44ae37fef6007c527765",
// 		"userName": "hello",
// 		"email": "hello@gmail.com",
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        out: (state) => {

            state = initialState;

        },
        enter: (state, { payload }) => {
            state.value = 1;
            state.email = payload.email;
            state.userName = payload.userName;
            state.id = payload._id;
        },
    }
})
export const { out, enter } = userSlice.actions;
export default userSlice.reducer;