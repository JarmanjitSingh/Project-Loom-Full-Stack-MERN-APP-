import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: UserSliceStateType = {
  loading: true,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userExist: (state, action: PayloadAction<UserType>) => {
      state.loading = false;
      state.user = action.payload;
    },
    userNotExist: (state) => {
      state.loading = false;
      state.user = null;
    },
  },
});

export const { userExist, userNotExist } = userSlice.actions;

export default userSlice.reducer;
