import { NewUser, User } from './types';
import {
  register, login, logout, updateUser, deleteUser,
} from './user.slice';
import { useAppDispatch, useAppSelector } from '../../common/hooks';

function useUser() {
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector((state) => state.userReducer);

  const registerUser = (newUser: NewUser) => {
    dispatch(register(newUser));
  };

  const loginUser = (newUser: NewUser) => {
    dispatch(login(newUser));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const updateUsers = (newUser: User) => {
    dispatch(updateUser(newUser));
  };

  const deleteUsers = (id: string) => {
    dispatch(deleteUser(id));
  };

  return {
    user,
    registerUser,
    loginUser,
    logoutUser,
    updateUsers,
    deleteUsers,
    error,
  };
}

export default useUser;
