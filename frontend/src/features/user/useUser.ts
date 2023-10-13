import { NewUser } from './types';
import { register, login, logout } from './user.slice';
import { useAppDispatch, useAppSelector } from '../../common/hooks';

function useUser() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer.user);

  const registerUser = (newUser: NewUser) => {
    dispatch(register(newUser));
  };

  const loginUser = (newUser: NewUser) => {
    dispatch(login(newUser));
  };

  const logoutUser = () => {
    dispatch(logout());
  };
  return {
    user,
    registerUser,
    loginUser,
    logoutUser,
  };
}

export default useUser;
