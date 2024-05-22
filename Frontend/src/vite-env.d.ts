/// <reference types="vite/client" />

type UserType = {
  _id: string;
  email: string;
  name?: string;
  emailVerification?: boolean;
  photoURL?: string;
  googleUID?: string;
  groups: GroupType[];
};

type GroupType = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  owner: string;
  members: string[];
  projects: ProjectType[];
};

type ProjectType = {
  _id: string;
  project: {
    _id: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    group: string;
  };
};

type UserSliceStateType = {
  user: UserType | null;
  loading: boolean;
};
