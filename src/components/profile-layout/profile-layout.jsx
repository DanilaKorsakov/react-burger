import { Outlet, useLocation } from 'react-router-dom';

import { ProfileNavigation } from '@components/profile-navigation/profile-navigation.jsx';

import styles from './profile-layout.module.css';

export const ProfileLayout = () => {
  const location = useLocation();

  return (
    <div className={`${styles.profile_layout} mt-30`}>
      <ProfileNavigation location={location} />
      <Outlet />
    </div>
  );
};
