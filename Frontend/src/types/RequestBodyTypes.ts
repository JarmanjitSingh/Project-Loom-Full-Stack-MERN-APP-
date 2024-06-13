export type LoginWithGoogleType = {
    email: string;
    googleUID: string;
  };
  
  export type LoginWithEmailPasswordType = {
    email: string;
    password: string;
  };
  
  export type NewUserRequestBody = {
    name?: string;
    email: string;
    photoURL?: string;
    googleUID?: string;
    password?: string;
  };
  
  export type NewGroupType = {
    name: string;
    description?: string;
  };
  
  export type NewProjectDataType = {
    group: string;
    name: string;
    description?: string;
    color: string;
  };