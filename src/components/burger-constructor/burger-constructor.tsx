import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '@/hooks.ts';
import { BurgerOrder } from '@components/burger-order/burger-order.js';
import { ConstructorIngredient } from '@components/constructor-ingredient/constructor-ingredient.js';
import {
  addBun,
  addIngredient,
  getBun,
  getPickedIngredients,
} from '@services/burger-constructor/slice.js';

import type { TIngredient } from '@utils/types.ts';

import styles from './burger-constructor.module.css';

type IngredientDropType = {
  highlightedIngredient: boolean;
};

type BunDropType = {
  highlightedBun: boolean;
};

export const BurgerConstructor = (): React.JSX.Element => {
  const ingredients = useSelector(getPickedIngredients);
  const navigate = useNavigate();
  const bun = useSelector(getBun);
  const dispatch = useDispatch();
  const location = useLocation();

  const bunRef = useRef<HTMLDivElement | null>(null);
  const ingredientRef = useRef<HTMLDivElement | null>(null);

  const [{ highlightedIngredient }, ingredientDrop] = useDrop<
    TIngredient,
    unknown,
    IngredientDropType
  >({
    accept: 'ingredient',
    collect: (monitor) => ({
      highlightedIngredient: monitor.canDrop(),
    }),
    drop: (ingredient) => {
      dispatch(addIngredient(ingredient));
    },
  });

  const [{ highlightedBun }, bunDrop] = useDrop<TIngredient, unknown, BunDropType>({
    accept: 'bun',
    collect: (monitor) => ({
      highlightedBun: monitor.canDrop(),
    }),
    drop: (bun) => {
      dispatch(addBun(bun));
    },
  });

  useEffect(() => {
    if (bunRef.current) {
      bunDrop(bunRef.current);
    }
    if (ingredientRef.current) {
      ingredientDrop(ingredientRef.current);
    }
  }, [bunDrop, ingredientDrop]);

  function handleClick(): void {
    navigate('/order', { state: { modalFrom: location } });
  }

  return (
    <section
      data-testid="burger-constructor"
      className={`${styles.burger_constructor} ml-10`}
    >
      <div ref={bunRef} className="ml-4">
        {bun ? (
          <ConstructorElement
            key={bun.key + 'top'}
            price={bun.price}
            text={bun.name + ' (верх)'}
            thumbnail={bun.image}
            type="top"
            isLocked={true}
            extraClass={`ml-8 mb-4`}
          />
        ) : (
          <div
            className={`${styles.ingredient_substrate} ${clsx(highlightedBun && styles.highlight)} constructor-element constructor-element_pos_top mb-4 ml-8`}
          >
            Выберите булки
          </div>
        )}
        <div
          ref={ingredientRef}
          data-testid="ingredients-drag-scroll"
          className={`${styles.ingredients} custom-scroll`}
        >
          {ingredients.length > 0 ? (
            <ul className={`${styles.ingredientsList}`}>
              {ingredients.map((ingredient, index) => (
                <li key={ingredient.key}>
                  <ConstructorIngredient ingredient={ingredient} index={index} />
                </li>
              ))}
            </ul>
          ) : (
            <div
              className={`${styles.ingredient_substrate} ${clsx(highlightedIngredient && styles.highlight)} constructor-element mb-4 ml-8`}
            >
              Выберите начинку
            </div>
          )}
        </div>
        {bun ? (
          <ConstructorElement
            key={bun.key + 'bottom'}
            price={bun.price}
            text={bun.name + ' (низ)'}
            thumbnail={bun.image}
            type="bottom"
            isLocked={true}
            extraClass={`ml-8`}
          />
        ) : (
          <div
            className={`${styles.ingredient_substrate} ${clsx(highlightedBun && styles.highlight)} constructor-element constructor-element_pos_bottom ml-8`}
          >
            Выберите булки
          </div>
        )}
      </div>

      <BurgerOrder handleClick={handleClick} />
    </section>
  );
};
