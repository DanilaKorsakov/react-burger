import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import { ProfileNavigation } from '@components/profile-navigation/profile-navigation.jsx';
import { logout } from '@services/user/actions.js';

import styles from './profile-page.module.css';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  function handleClick(e) {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <div className={`${styles.profile_layout} mt-30`}>
      <ProfileNavigation location={location} onClick={handleClick} />
      <Outlet />
    </div>
  );
};
