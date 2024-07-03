import { TasklistType } from "../pages/TasklistPage";

export type UserSliceStateType = {
    user: UserType | null;
    loading: boolean;
  };
  

  export type TasklistSliceStateType = {
    tasklist: TasklistType | null;
    loading: boolean;
  };
  