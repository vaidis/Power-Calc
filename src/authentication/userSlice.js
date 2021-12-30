import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  "user": 'anonymous',
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAction(state, action) {
      state.user = action.payload
    },  
  }});

export default userSlice.reducer;

export const {
  setUserAction
} = userSlice.actions;
