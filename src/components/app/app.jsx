import { useEffect, useState, useRef } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import Ingredient from '@components/ingredient/ingredient';
import IngredientList from '@components/ingredients-list/ingredients-list';
import { ingredients } from '@utils/ingredients';

import styles from './app.module.css';

export const App = () => {
  const [pickedIngredients, setPickedIngredients] = useState([]);
  const [hasBun, setHasBun] = useState(false);
  const mainRef = useRef(undefined);
  const bunRef = useRef(undefined);
  const sauceRef = useRef(undefined);

  useEffect(() => {
    pickedIngredients.forEach((pickedIngredient) => {
      if (pickedIngredient.type === 'bun') setHasBun(true);
    });
  }, [pickedIngredients]);

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');
  const mains = ingredients.filter((ingredient) => ingredient.type === 'main');

  const handleAddPickedIngredients = (ingredient) => {
    if (!hasBun) {
      setPickedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    } else if (hasBun && ingredient.type !== 'bun') {
      setPickedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    }
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients
          ingredients={ingredients}
          mainRef={mainRef}
          bunRef={bunRef}
          sauceRef={sauceRef}
        >
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
      </main>
    </div>
  );
};
