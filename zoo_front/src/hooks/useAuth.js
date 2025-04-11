import { useSelector, useDispatch } from 'react-redux';
import { authService } from '../features/auth/services';
import { logout } from '../features/auth/slice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isLoading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
  };

  return {
    user,
    token,
    isLoading,
    logout: handleLogout
  };
};

export default useAuth;