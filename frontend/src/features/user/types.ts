// ================================== Data types
export interface User {
  id: string;
  email: string;
  password: string;
}

export interface NewUser {
  email: string;
  password: string;
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
}
