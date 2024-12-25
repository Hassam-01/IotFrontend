import { createSlice } from "@reduxjs/toolkit";

const userIDSlice = createSlice({
    name: "userID",
    initialState: {
        userID: null,
        userName: null,
    },
    reducers: {
        setUserID: (state, action) => {
        state.userID = action.payload.userID;
        state.userName = action.payload.userName;
        },
    },
    });

export const { setUserID } = userIDSlice.actions;
export default userIDSlice.reducer;
