import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import {
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import Ingredient from '@components/ingredient/ingredient';
import IngredientList from '@components/ingredients-list/ingredients-list';
import { ingredientsLink } from '@utils/consts';

import styles from './app.module.css';

export const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [pickedIngredients, setPickedIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [hasBun, setHasBun] = useState(false);

  const mainRef = useRef(undefined);
  const bunRef = useRef(undefined);
  const sauceRef = useRef(undefined);

  const buns = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === 'bun'),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === 'main'),
    [ingredients]
  );

  useLayoutEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const response = await fetch(ingredientsLink);
        const result = await response.json();

        setIngredients(result.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    pickedIngredients.forEach((pickedIngredient) => {
      if (pickedIngredient.type === 'bun') setHasBun(true);
    });
  }, [pickedIngredients]);

  const handleAddPickedIngredients = useCallback(
    (ingredient) => {
      if (!hasBun) {
        setPickedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
      } else if (hasBun && ingredient.type !== 'bun') {
        setPickedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
      }
    },
    [ingredients]
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {error ? (
          <div className="text text_type_main-large">
            Произошла ошибка, перезагрузите страницу
          </div>
        ) : loading ? (
          <Preloader />
        ) : (
          ingredients && (
            <>
              <BurgerIngredients mainRef={mainRef} bunRef={bunRef} sauceRef={sauceRef}>
                <IngredientList name="Булки" ingredients={buns} ref={bunRef}>
                  {(ingredient) => {
                    return (
                      <Ingredient
                        ingredient={ingredient}
                        hasBun={hasBun}
                        onAddPickedIngredients={handleAddPickedIngredients}
                      />
                    );
                  }}
                </IngredientList>
                <IngredientList name="Соусы" ingredients={sauces} ref={sauceRef}>
                  {(ingredient) => {
                    return (
                      <Ingredient
                        ingredient={ingredient}
                        hasBun={hasBun}
                        onAddPickedIngredients={handleAddPickedIngredients}
                      />
                    );
                  }}
                </IngredientList>
                <IngredientList name="Начинки" ingredients={mains} ref={mainRef}>
                  {(ingredient) => {
                    return (
                      <Ingredient
                        ingredient={ingredient}
                        hasBun={hasBun}
                        onAddPickedIngredients={handleAddPickedIngredients}
                      />
                    );
                  }}
                </IngredientList>
              </BurgerIngredients>
              <BurgerConstructor ingredients={pickedIngredients} />
            </>
          )
        )}
      </main>
    </div>
  );
};
