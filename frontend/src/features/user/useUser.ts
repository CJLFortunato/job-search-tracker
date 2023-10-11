import { NewUser } from './types';
import { register, login } from './user.slice';
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
  return { user, registerUser, loginUser };
}

export default useUser;
