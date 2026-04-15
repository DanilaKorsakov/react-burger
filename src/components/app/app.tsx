import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from '@/hooks.ts';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { FeedOrderDetails } from '@components/feed-order-details/feed-order-details.tsx';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details.js';
import { Modal } from '@components/modal/modal.js';
import { OrderDetails } from '@components/order-details/order-details.js';
import { ProtectedRoute } from '@components/protected-route/protected-route.js';
import { FeedPage } from '@pages/feed-page/feed-page.js';
import { ForgotPasswordPage } from '@pages/forgot-password-page/forgot-password-page.js';
import { Home } from '@pages/home/home.js';
import { LoginPage } from '@pages/login-page/login-page.js';
import { NotFoundPage } from '@pages/not-found-page/not-found-page.js';
import { ProfileOrderPage } from '@pages/profile-order-page/profile-order-page.js';
import { ProfilePage } from '@pages/profile-page/profile-page.js';
import { ProfileSettingsPage } from '@pages/profile-settings-page/profile-settings-page.js';
import { RegisterPage } from '@pages/register-page/register-page.js';
import { ResetPasswordPage } from '@pages/reset-password-page/reset-password-page.js';
import { wsConnect } from '@services/feed/actions.ts';
import { loadIngredients } from '@services/ingredients/actions.js';
import {
  getIngredients,
  getIngredientsError,
  getIngredientsLoading,
} from '@services/ingredients/reducer.js';
import { FEED_URL } from '@services/middleware/socket-middlware.ts';
import { getOrderLoading } from '@services/order-details/reducer.js';
import { checkUserAuth } from '@services/user/actions.js';

import type { Location } from 'react-router-dom';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const ingredients = useSelector(getIngredients);
  const loading = useSelector(getIngredientsLoading);
  const error = useSelector(getIngredientsError);
  const location = useLocation();
  const prevLocation: Location = location.state?.modalFrom;

  const isLoading = useSelector(getOrderLoading);

  useLayoutEffect(() => {
    dispatch(loadIngredients());
  }, []);

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(wsConnect(FEED_URL));
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
                <Route path={'feed/:id'} element={<FeedOrderDetails hasHeader />} />
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
                  <Route
                    path={'feed/:id'}
                    element={
                      <Modal prevLocation={prevLocation}>
                        <FeedOrderDetails />
                      </Modal>
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
