/// <reference types="vite/client" />

type UserType = {
  _id: string;
  email: string;
  name?: string;
  emailVerification?: boolean;
  photoURL?: string;
  googleUID?: string;
};

type UserSliceStateType = {
  user: UserType | null;
  loading: boolean;
};
