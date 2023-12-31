// ================================== Data types
export interface User {
  _id: string;
  email: string;
  password?: string;
}

export interface NewUser {
  email: string;
  password: string;
}

export interface UpdateProps {
  _id: string,
  email: string,
}
// ================================== props types

export interface State {
  user: User | undefined,
  isLoading: boolean,
  error: string,
}
export interface UserFormProps {
  isLogin: boolean
}

export interface DeleteButtonProps {
  id: string
  setOpen?: Function,
}
