import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details.jsx';
import { Modal } from '@components/modal/modal.jsx';
import { OrderDetails } from '@components/order-details/order-details.jsx';
import { ProtectedRoute } from '@components/protected-route/protected-route.jsx';
import { FeedPage } from '@pages/feed-page/feed-page.jsx';
import { ForgotPasswordPage } from '@pages/forgot-password-page/forgot-password-page.jsx';
import { Home } from '@pages/home/home.jsx';
import { LoginPage } from '@pages/login-page/login-page.jsx';
import { NotFoundPage } from '@pages/not-found-page/not-found-page.jsx';
import { ProfileOrderPage } from '@pages/profile-order-page/profile-order-page.jsx';
import { ProfilePage } from '@pages/profile-page/profile-page.jsx';
import { ProfileSettingsPage } from '@pages/profile-settings-page/profile-settings-page.jsx';
import { RegisterPage } from '@pages/register-page/register-page.jsx';
import { ResetPasswordPage } from '@pages/reset-password-page/reset-password-page.jsx';
import { loadIngredients } from '@services/ingredients/actions.js';
import {
  getIngredients,
  getIngredientsError,
  getIngredientsLoading,
} from '@services/ingredients/reducer.js';
import { getOrderLoading } from '@services/order-details/reducer.js';
import { checkUserAuth } from '@services/user/actions.js';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(getIngredients);
  const loading = useSelector(getIngredientsLoading);
  const error = useSelector(getIngredientsError);
  const location = useLocation();
  const prevLocation = location.state?.modalFrom;

  const isLoading = useSelector(getOrderLoading);

  useLayoutEffect(() => {
    dispatch(loadIngredients());
  }, []);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        {error ? (
          <div className="text text_type_main-large">
            Произошла ошибка, перезагрузите страницу
          </div>
        ) : loading ? (
          <Preloader />
        ) : (
          ingredients.length > 0 && (
            <>
              <Routes location={prevLocation || location}>
                <Route path={'/'} element={<Home />} />
                <Route
                  path={'/ingredients/:id'}
                  element={<IngredientDetails header={'Детали ингредиента'} />}
                />
                <Route
                  path={'/register'}
                  element={<ProtectedRoute onlyUnAuth component={<RegisterPage />} />}
                />
                <Route
                  path={'/login'}
                  element={<ProtectedRoute onlyUnAuth component={<LoginPage />} />}
                />
                <Route
                  path={'/forgot-password'}
                  element={
                    <ProtectedRoute onlyUnAuth component={<ForgotPasswordPage />} />
                  }
                />
                <Route
                  path={'/reset-password'}
                  element={
                    <ProtectedRoute onlyUnAuth component={<ResetPasswordPage />} />
                  }
                />
                <Route element={<ProtectedRoute component={<ProfilePage />} />}>
                  <Route path={'/profile'} element={<ProfileSettingsPage />} />
                  <Route path={'/profile/orders'} element={<ProfileOrderPage />} />
                </Route>
                <Route path={'/feed'} element={<FeedPage />} />
                <Route path={'*'} element={<NotFoundPage />} />
              </Routes>

              {prevLocation && (
                <Routes>
                  <Route
                    path={'ingredients/:id'}
                    element={
                      <Modal header={'Детали ингредиента'} prevLocation={prevLocation}>
                        <IngredientDetails />
                      </Modal>
                    }
                  />
                  <Route
                    path={'/order'}
                    element={
                      <ProtectedRoute
                        component={
                          <Modal
                            prevLocation={prevLocation}
                            header={(isLoading && 'Формируется заказ') || ''}
                          >
                            <OrderDetails />
                          </Modal>
                        }
                      />
                    }
                  ></Route>
                </Routes>
              )}
            </>
          )
        )}
      </main>
    </div>
  );
};
