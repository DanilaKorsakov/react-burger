import { Outlet, useLocation } from 'react-router-dom';

import { useDispatch } from '@/hooks.ts';
import { ProfileNavigation } from '@components/profile-navigation/profile-navigation.tsx';
import { logout } from '@services/user/actions.ts';

import styles from './profile-page.module.css';

export const ProfilePage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();

  function handleClick(): void {
    dispatch(logout());
  }

  return (
    <div className={`${styles.profile_layout} mt-30`}>
      <ProfileNavigation location={location} onClick={handleClick} />
      <Outlet />
    </div>
  );
};
