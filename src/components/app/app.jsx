import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details.jsx';
import { Modal } from '@components/modal/modal.jsx';
import { Home } from '@pages/home/home.jsx';
import { loadIngredients } from '@services/ingredients/actions.js';
import {
  getIngredients,
  getIngredientsError,
  getIngredientsLoading,
} from '@services/ingredients/reducer.js';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(getIngredients);
  const loading = useSelector(getIngredientsLoading);
  const error = useSelector(getIngredientsError);
  const location = useLocation();
  const prevLocation = location.state?.from;
  useLayoutEffect(() => {
    dispatch(loadIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
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
                element={
                  <main className={`${styles.main} pl-5 pr-5`}>
                    <IngredientDetails header={'Детали ингредиента'} />
                  </main>
                }
              />
            </Routes>

            {prevLocation && (
              <Routes>
                <Route
                  path={'ingredients/:id'}
                  element={
                    <Modal header={'Детали ингредиента'}>
                      <IngredientDetails />
                    </Modal>
                  }
                />
              </Routes>
            )}
          </>
        )
      )}
    </div>
  );
};
