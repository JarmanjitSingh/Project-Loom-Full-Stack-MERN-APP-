import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TasklistSliceStateType } from "../../types/SliceTypes";
import { TasklistType } from "../../pages/TasklistPage";

const initialState: TasklistSliceStateType = {
  loading: true,
  tasklist: null,
};

export const tasklistSlice = createSlice({
  name: "tasklist",
  initialState,
  reducers: {
    tasklistData: (state, action: PayloadAction<TasklistType>) => {
      state.loading = false;
      state.tasklist = action.payload;
    },
    tasklistDataNotFound: (state) => {
      state.loading = false;
      state.tasklist = null;
    },
    tasklistLoadingTrue: (state)=>{
      state.loading = true
    }
  },
});

export const { tasklistData, tasklistDataNotFound, tasklistLoadingTrue } = tasklistSlice.actions;

export default tasklistSlice.reducer;
