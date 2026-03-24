import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getIsAuthChecked, getUserData } from '@services/user/reducer.ts';

import type { ReactPortal } from 'react';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element | ReactPortal;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component,
}: ProtectedRouteProps): React.JSX.Element => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUserData);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname !== '/order' ? location : '/' }}
        replace
      />
    );
  }

  return component;
};
